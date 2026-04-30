const express = require('express');
const { auth } = require('../middleware/auth');
const Team = require('../models/Team');

const router = express.Router();

// Create Team
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const team = new Team({
      name,
      description,
      owner: req.userId,
      members: [{ userId: req.userId }],
    });
    await team.save();
    await team.populate('owner members.userId');
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Teams (user is member of)
router.get('/', auth, async (req, res) => {
  try {
    const teams = await Team.find({
      $or: [
        { owner: req.userId },
        { 'members.userId': req.userId },
      ],
    }).populate('owner members.userId');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Team by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('owner members.userId');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const isMember = team.members.some(m => m.userId._id.toString() === req.userId);
    if (team.owner._id.toString() !== req.userId && !isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Member to Team
router.post('/:id/members', auth, async (req, res) => {
  try {
    const { userId } = req.body;
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (team.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only owner can add members' });
    }

    if (team.members.some(m => m.userId.toString() === userId)) {
      return res.status(400).json({ message: 'User already a member' });
    }

    team.members.push({ userId });
    await team.save();
    await team.populate('owner members.userId');
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove Member from Team
router.delete('/:id/members/:userId', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (team.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only owner can remove members' });
    }

    team.members = team.members.filter(m => m.userId.toString() !== req.params.userId);
    await team.save();
    await team.populate('owner members.userId');
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
