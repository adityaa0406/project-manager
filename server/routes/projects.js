const express = require('express');
const { auth, adminOnly } = require('../middleware/auth');
const Project = require('../models/Project');

const router = express.Router();

// Create Project
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const project = new Project({
      title,
      description,
      dueDate,
      owner: req.userId,
      members: [{ userId: req.userId, role: 'Admin' }],
    });
    await project.save();
    await project.populate('owner members.userId');
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.userId },
        { 'members.userId': req.userId },
      ],
    }).populate('owner members.userId');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Project by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('owner members.userId');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check access
    const isMember = project.members.some(m => m.userId._id.toString() === req.userId);
    if (project.owner._id.toString() !== req.userId && !isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if owner
    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only owner can update' });
    }

    Object.assign(project, req.body);
    project.updatedAt = Date.now();
    await project.save();
    await project.populate('owner members.userId');
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only owner can delete' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Member to Project
router.post('/:id/members', auth, async (req, res) => {
  try {
    const { userId, role } = req.body;
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only owner can add members' });
    }

    // Check if already member
    if (project.members.some(m => m.userId.toString() === userId)) {
      return res.status(400).json({ message: 'User already a member' });
    }

    project.members.push({ userId, role: role || 'Member' });
    await project.save();
    await project.populate('owner members.userId');
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
