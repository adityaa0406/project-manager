import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import './Teams.css';

export default function Teams() {
  const { user } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    else fetchTeams();
  }, [user, navigate]);

  const fetchTeams = async () => {
    try {
      const res = await api.get('/teams');
      setTeams(res.data);
    } catch (err) {
      console.error('Failed to fetch teams:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/teams', formData);
      setTeams([...teams, res.data]);
      setFormData({ name: '', description: '' });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create team');
    }
  };

  return (
    <div className="teams-page">
      <div className="page-header">
        <h1>👥 Teams</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Team'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="team-form">
          <input
            type="text"
            placeholder="Team Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button type="submit">Create Team</button>
        </form>
      )}

      <div className="teams-container">
        {teams.length === 0 ? (
          <p className="empty">No teams yet</p>
        ) : (
          teams.map(team => (
            <div key={team._id} className="team-card">
              <h2>{team.name}</h2>
              <p className="description">{team.description}</p>
              <div className="members-list">
                <h4>Members ({team.members.length})</h4>
                <ul>
                  {team.members.map(member => (
                    <li key={member.userId._id}>
                      {member.userId.name}
                      {team.owner._id === member.userId._id && (
                        <span className="owner-badge">Owner</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
