import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ProjectContext } from '../context/ProjectContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { projects, tasks, fetchProjects, loading } = useContext(ProjectContext);
  const [stats, setStats] = useState({ total: 0, completed: 0, overdue: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchProjects();
    }
  }, [user, navigate, fetchProjects]);

  useEffect(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Done').length;
    const overdue = tasks.filter(t => t.status === 'Overdue').length;
    setStats({ total, completed, overdue });
  }, [tasks]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="nav-left">
          <h1>📊 Project Manager</h1>
        </div>
        <div className="nav-right">
          <span>{user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="sidebar">
          <ul>
            <li><a href="/dashboard">📈 Dashboard</a></li>
            <li><a href="/projects">📁 Projects</a></li>
            <li><a href="/tasks">✅ My Tasks</a></li>
            <li><a href="/teams">👥 Teams</a></li>
          </ul>
        </div>

        <main className="main-content">
          <section className="stats-section">
            <h2>Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{projects.length}</h3>
                <p>Projects</p>
              </div>
              <div className="stat-card">
                <h3>{stats.total}</h3>
                <p>Total Tasks</p>
              </div>
              <div className="stat-card">
                <h3>{stats.completed}</h3>
                <p>Completed</p>
              </div>
              <div className="stat-card alert">
                <h3>{stats.overdue}</h3>
                <p>Overdue</p>
              </div>
            </div>
          </section>

          <section className="recent-section">
            <h2>Recent Projects</h2>
            {loading ? (
              <p>Loading...</p>
            ) : projects.length === 0 ? (
              <p>No projects yet. <a href="/projects">Create one</a></p>
            ) : (
              <div className="projects-list">
                {projects.slice(0, 5).map(project => (
                  <div key={project._id} className="project-item">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-meta">
                      <span className={`status ${project.status.toLowerCase()}`}>{project.status}</span>
                      <span className="members">{project.members.length} members</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
