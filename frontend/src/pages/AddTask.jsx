import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { createTask } from '../utils/api';
import '../styles/addtask.css';

const AddTask = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (taskData) => {
    setIsSubmitting(true);
    setError('');

    try {
      await createTask(taskData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-task-container">
      <div className="add-task-box">
        <h1 className="add-task-heading">Add New Task</h1>

        {error && (
          <div className="add-task-error">
            <p>{error}</p>
          </div>
        )}

        <TaskForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitText="Create Task"
        />
      </div>
    </div>
  );
};

export default AddTask;
