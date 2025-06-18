import { useState, useEffect } from 'react';
import { getTasks, deleteTask as deleteTaskAPI, updateTask as updateTaskAPI } from '../utils/api';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskAPI(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const updatedTask = await updateTaskAPI(id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError(err.message || 'Failed to update task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    deleteTask,
    updateTask,
    refetch: fetchTasks
  };
};

export default useTasks;