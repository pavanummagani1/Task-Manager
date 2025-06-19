import { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import useTasks from '../hooks/useTasks';
import '../styles/home.css';

const Home = () => {
  const { tasks, loading, error, deleteTask, updateTask } = useTasks();
  const [statusFilter, setStatusFilter] = useState('all');

  // Extract actual task array safely
  const taskList = Array.isArray(tasks?.data) ? tasks.data : [];

  const filteredTasks = taskList.filter(task => {
    if (statusFilter === 'all') return true;
    return task.status === statusFilter;
  });

  if (loading) {
    return (
      <div className="home-loading">
        <div className="home-loading-text">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-error-box">
        <p className="home-error-text">Error loading tasks: {error}</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Task Manager</h1>
        <div className="home-subtitle">
          {taskList.length} {taskList.length === 1 ? 'task' : 'tasks'} total
        </div>
      </div>

      <TaskFilter 
        currentFilter={statusFilter} 
        onFilterChange={setStatusFilter}
        taskCounts={{
          all: taskList.length,
          todo: taskList.filter(t => t.status === 'todo').length,
          in_progress: taskList.filter(t => t.status === 'in_progress').length,
          done: taskList.filter(t => t.status === 'done').length,
        }}
      />

      <TaskList 
        tasks={filteredTasks}
        onDelete={deleteTask}
        onUpdate={updateTask}
      />
    </div>
  );
};

export default Home;
