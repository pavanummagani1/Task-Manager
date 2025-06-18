import { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import useTasks from '../hooks/useTasks';
import '../styles/home.css';

const Home = () => {
  const { tasks, loading, error, deleteTask, updateTask } = useTasks();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
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
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
        </div>
      </div>

      <TaskFilter 
        currentFilter={statusFilter} 
        onFilterChange={setStatusFilter}
        taskCounts={{
          all: tasks.length,
          todo: tasks.filter(t => t.status === 'todo').length,
          in_progress: tasks.filter(t => t.status === 'in_progress').length,
          done: tasks.filter(t => t.status === 'done').length,
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
