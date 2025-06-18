import { AppDataSource } from '../config/database.js';
import { Task, TaskStatus } from '../entities/Task.js';
import { validate as isUuid } from 'uuid';

const taskRepository = AppDataSource.getRepository(Task);

export const taskController = {
  // Get all tasks
  getAllTasks: async (req, res) => {
    try {
      const { status, sortBy = 'createdAt', order = 'DESC' } = req.query;
      
      let queryBuilder = taskRepository.createQueryBuilder('task');
      
      if (status && Object.values(TaskStatus).includes(status)) {
        queryBuilder = queryBuilder.where('task.status = :status', { status });
      }
      
      queryBuilder = queryBuilder.orderBy(`task.${sortBy}`, order.toUpperCase());
      
      const tasks = await queryBuilder.getMany();
      
      res.json({
        success: true,
        data: tasks,
        count: tasks.length
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch tasks' 
      });
    }
  },

  // Get single task
  getTaskById: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!isUuid(id)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid task ID format' 
        });
      }

      const task = await taskRepository.findOne({ where: { id } });
      
      if (!task) {
        return res.status(404).json({ 
          success: false, 
          error: 'Task not found' 
        });
      }

      res.json({
        success: true,
        data: task
      });
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch task' 
      });
    }
  },

  // Create new task
  createTask: async (req, res) => {
    try {
      const { title, description, status, dueDate } = req.body;

      // Validation
      if (!title || title.trim().length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Title is required' 
        });
      }

      if (status && !Object.values(TaskStatus).includes(status)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid status value' 
        });
      }

      const task = taskRepository.create({
        title: title.trim(),
        description: description?.trim() || null,
        status: status || TaskStatus.TODO,
        dueDate: dueDate ? new Date(dueDate) : null
      });

      const savedTask = await taskRepository.save(task);

      res.status(201).json({
        success: true,
        data: savedTask,
        message: 'Task created successfully'
      });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to create task' 
      });
    }
  },

  // Update task
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status, dueDate } = req.body;

      if (!isUuid(id)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid task ID format' 
        });
      }

      const task = await taskRepository.findOne({ where: { id } });
      
      if (!task) {
        return res.status(404).json({ 
          success: false, 
          error: 'Task not found' 
        });
      }

      // Validation
      if (title !== undefined && (!title || title.trim().length === 0)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Title cannot be empty' 
        });
      }

      if (status && !Object.values(TaskStatus).includes(status)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid status value' 
        });
      }

      // Update fields
      if (title !== undefined) task.title = title.trim();
      if (description !== undefined) task.description = description?.trim() || null;
      if (status !== undefined) task.status = status;
      if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;

      const updatedTask = await taskRepository.save(task);

      res.json({
        success: true,
        data: updatedTask,
        message: 'Task updated successfully'
      });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to update task' 
      });
    }
  },

  // Delete task
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;

      if (!isUuid(id)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid task ID format' 
        });
      }

      const result = await taskRepository.delete(id);
      
      if (result.affected === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'Task not found' 
        });
      }

      res.json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to delete task' 
      });
    }
  }
};