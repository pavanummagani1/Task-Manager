import { Link, useLocation } from 'react-router-dom';
import "../styles/navigation.css"

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            Task Manager
          </Link>
          <div className="nav-links">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              All Tasks
            </Link>
            <Link
              to="/add"
              className={`nav-link ${isActive('/add') ? 'active' : ''}`}
            >
              Add Task
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
