import React, { createContext, useState, useCallback } from 'react';
import api from '../api';

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (title, description, dueDate) => {
    try {
      const res = await api.post('/projects', { title, description, dueDate });
      setProjects([...projects, res.data]);
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create project';
    }
  }, [projects]);

  const updateProject = useCallback(async (id, data) => {
    try {
      const res = await api.put(`/projects/${id}`, data);
      setProjects(projects.map(p => p._id === id ? res.data : p));
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update project';
    }
  }, [projects]);

  const deleteProject = useCallback(async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete project';
    }
  }, [projects]);

  const fetchTasks = useCallback(async (projectId) => {
    try {
      const res = await api.get(`/tasks/project/${projectId}`);
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  }, []);

  const createTask = useCallback(async (title, description, projectId, assignedTo, priority, dueDate) => {
    try {
      const res = await api.post('/tasks', { title, description, projectId, assignedTo, priority, dueDate });
      setTasks([...tasks, res.data]);
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create task';
    }
  }, [tasks]);

  const updateTask = useCallback(async (id, data) => {
    try {
      const res = await api.put(`/tasks/${id}`, data);
      setTasks(tasks.map(t => t._id === id ? res.data : t));
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update task';
    }
  }, [tasks]);

  return (
    <ProjectContext.Provider value={{
      projects,
      tasks,
      loading,
      fetchProjects,
      createProject,
      updateProject,
      deleteProject,
      fetchTasks,
      createTask,
      updateTask,
    }}>
      {children}
    </ProjectContext.Provider>
  );
}
