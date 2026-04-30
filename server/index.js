require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/project-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/teams', require('./routes/teams'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
