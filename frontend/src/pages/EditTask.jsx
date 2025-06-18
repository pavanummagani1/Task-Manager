import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { getTask, updateTask } from '../utils/api';
import '../styles/edittask.css';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getTask(id);
        setTask(taskData);
      } catch (err) {
        setError(err.message || 'Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (taskData) => {
    setIsSubmitting(true);
    setError('');

    try {
      await updateTask(id, taskData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading task...</div>
      </div>
    );
  }

  if (error && !task) {
    return (
      <div className="edit-task-container">
        <div className="edit-task-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-task-container">
      <div className="edit-task-box">
        <h1 className="edit-task-heading">Edit Task</h1>

        {error && (
          <div className="edit-task-error">
            <p>{error}</p>
          </div>
        )}

        <TaskForm
          initialTask={task}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitText="Update Task"
        />
      </div>
    </div>
  );
};

export default EditTask;
