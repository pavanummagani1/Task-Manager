import '../styles/taskfilter.css';

const TaskFilter = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'todo', label: 'To Do', count: taskCounts.todo },
    { key: 'in_progress', label: 'In Progress', count: taskCounts.in_progress },
    { key: 'done', label: 'Done', count: taskCounts.done },
  ];

  return (
    <div className="task-filter">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-button ${currentFilter === filter.key ? 'active' : ''}`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
