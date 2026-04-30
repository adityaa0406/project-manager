import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Teams from './pages/Teams';
import './App.css';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('token');
    if (token && !user) {
      // In a real app, verify token with backend
      try {
        const userData = JSON.parse(localStorage.getItem('user') || 'null');
        if (userData) setUser(userData);
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  }, [user, setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/teams" element={<ProtectedRoute><Teams /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
