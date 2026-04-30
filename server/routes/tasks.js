const express = require('express');
const { auth } = require('../middleware/auth');
const Task = require('../models/Task');
const Project = require('../models/Project');

const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, priority, dueDate } = req.body;
    
    // Check project access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isMember = project.members.some(m => m.userId.toString() === req.userId);
    if (project.owner.toString() !== req.userId && !isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const task = new Task({
      title,
      description,
      projectId,
      assignedTo,
      priority,
      dueDate,
      createdBy: req.userId,
    });
    await task.save();
    await task.populate('assignedTo createdBy projectId');
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Tasks for Project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId })
      .populate('assignedTo createdBy');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User's Assigned Tasks
router.get('/user/assigned', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.userId })
      .populate('projectId assignedTo createdBy');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Task by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo createdBy projectId');
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Task
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check access (creator, assignee, or project admin)
    const project = await Project.findById(task.projectId);
    const isProjectAdmin = project.owner.toString() === req.userId || 
      project.members.some(m => m.userId.toString() === req.userId && m.role === 'Admin');

    if (task.createdBy.toString() !== req.userId && 
        task.assignedTo?.toString() !== req.userId && 
        !isProjectAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    Object.assign(task, req.body);
    task.updatedAt = Date.now();
    
    // Update status if overdue
    if (task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done') {
      task.status = 'Overdue';
    }

    await task.save();
    await task.populate('assignedTo createdBy projectId');
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only creator can delete' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
