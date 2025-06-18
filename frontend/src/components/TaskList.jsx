import TaskCard from './TaskCard';
import '../styles/tasklist.css';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3 className="empty-title">No tasks found</h3>
        <p className="empty-text">Get started by creating your first task.</p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;
