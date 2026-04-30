import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ProjectContext } from '../context/ProjectContext';
import api from '../api';
import './Tasks.css';

export default function Tasks() {
  const { user } = useContext(AuthContext);
  const { projects, createTask, updateTask } = useContext(ProjectContext);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    priority: 'Medium',
    dueDate: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    else fetchUserTasks();
  }, [user, navigate]);

  const fetchUserTasks = async () => {
    try {
      const res = await api.get('/tasks/user/assigned');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createTask(
        formData.title,
        formData.description,
        formData.projectId,
        user._id,
        formData.priority,
        formData.dueDate
      );
      setFormData({ title: '', description: '', projectId: '', priority: 'Medium', dueDate: '' });
      setShowForm(false);
      fetchUserTasks();
    } catch (err) {
      setError(err.message || 'Failed to create task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      fetchUserTasks();
    } catch (err) {
      setError(err.message || 'Failed to update task');
    }
  };

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>✅ My Tasks</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <select
            value={formData.projectId}
            onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
            required
          >
            <option value="">Select Project</option>
            {projects.map(p => (
              <option key={p._id} value={p._id}>{p.title}</option>
            ))}
          </select>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
          <button type="submit">Create Task</button>
        </form>
      )}

      <div className="tasks-container">
        <div className="status-column">
          <h3>📋 Todo</h3>
          {tasks
            .filter(t => t.status === 'Todo')
            .map(task => (
              <div key={task._id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span className={`priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="due-date">{new Date(task.dueDate).toLocaleDateString()}</span>
                  )}
                </div>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            ))}
        </div>

        <div className="status-column">
          <h3>🔄 In Progress</h3>
          {tasks
            .filter(t => t.status === 'In Progress')
            .map(task => (
              <div key={task._id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span className={`priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="due-date">{new Date(task.dueDate).toLocaleDateString()}</span>
                  )}
                </div>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            ))}
        </div>

        <div className="status-column">
          <h3>✨ Done</h3>
          {tasks
            .filter(t => t.status === 'Done')
            .map(task => (
              <div key={task._id} className="task-card done">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span className={`priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="due-date">{new Date(task.dueDate).toLocaleDateString()}</span>
                  )}
                </div>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            ))}
        </div>

        <div className="status-column">
          <h3>⚠️ Overdue</h3>
          {tasks
            .filter(t => t.status === 'Overdue')
            .map(task => (
              <div key={task._id} className="task-card overdue">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span className={`priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="due-date">{new Date(task.dueDate).toLocaleDateString()}</span>
                  )}
                </div>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
