import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ProjectContext } from '../context/ProjectContext';
import './Projects.css';

export default function Projects() {
  const { user } = useContext(AuthContext);
  const { projects, fetchProjects, createProject, updateProject, deleteProject } = useContext(ProjectContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    else fetchProjects();
  }, [user, navigate, fetchProjects]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createProject(formData.title, formData.description, formData.dueDate);
      setFormData({ title: '', description: '', dueDate: '' });
      setShowForm(false);
    } catch (err) {
      setError(err.message || 'Failed to create project');
    }
  };

  const handleUpdateStatus = async (projectId, newStatus) => {
    try {
      await updateProject(projectId, { status: newStatus });
    } catch (err) {
      setError(err.message || 'Failed to update project');
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProject(projectId);
      } catch (err) {
        setError(err.message || 'Failed to delete project');
      }
    }
  };

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>📁 Projects</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="project-form">
          <input
            type="text"
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
          <button type="submit">Create Project</button>
        </form>
      )}

      <div className="projects-container">
        {projects.length === 0 ? (
          <p className="empty">No projects yet</p>
        ) : (
          projects.map(project => (
            <div key={project._id} className="project-card">
              <div className="card-header">
                <h2>{project.title}</h2>
                <span className={`badge ${project.status.toLowerCase()}`}>{project.status}</span>
              </div>
              <p className="description">{project.description}</p>
              {project.dueDate && (
                <p className="due-date">Due: {new Date(project.dueDate).toLocaleDateString()}</p>
              )}
              <div className="card-footer">
                <span className="members">👥 {project.members.length} members</span>
                <div className="actions">
                  <select
                    value={project.status}
                    onChange={(e) => handleUpdateStatus(project._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Active">Active</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button onClick={() => handleDelete(project._id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
