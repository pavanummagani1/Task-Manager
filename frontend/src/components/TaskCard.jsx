import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';
import "../styles/taskcard.css"

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'todo':
        return 'status-todo';
      case 'in_progress':
        return 'status-inprogress';
      case 'done':
        return 'status-done';
      default:
        return 'status-todo';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'in_progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return status;
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdate(task.id, { ...task, status: newStatus });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const isOverdue =
    task.due_date && new Date(task.due_date) < new Date() && task.status !== 'done';

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <Link to={`/edit/${task.id}`} className="edit-icon" title="Edit task">✏️</Link>
          <button onClick={handleDelete} className="delete-icon" title="Delete task">🗑️</button>
        </div>
      </div>

      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-status-row">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`task-status ${getStatusClass(task.status)}`}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {task.due_date && (
          <div className={`task-due ${isOverdue ? 'overdue' : ''}`}>
            Due: {formatDate(task.due_date)}
            {isOverdue && ' (Overdue)'}
          </div>
        )}
      </div>

      <div className="task-created">
        Created: {formatDate(task.created_at)}
      </div>
    </div>
  );
};

export default TaskCard;

