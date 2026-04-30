#!/usr/bin/env node

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./server/models/User');
const Project = require('./server/models/Project');
const Task = require('./server/models/Task');
const Team = require('./server/models/Team');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project-manager';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    await Team.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create demo users
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'Admin',
    });
    await adminUser.save();

    const memberUser1 = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'Member',
    });
    await memberUser1.save();

    const memberUser2 = new User({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      role: 'Member',
    });
    await memberUser2.save();

    console.log('👥 Created demo users');

    // Create demo projects
    const project1 = new Project({
      title: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI/UX',
      owner: adminUser._id,
      members: [
        { userId: adminUser._id, role: 'Admin' },
        { userId: memberUser1._id, role: 'Member' },
        { userId: memberUser2._id, role: 'Member' },
      ],
      status: 'Active',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    await project1.save();

    const project2 = new Project({
      title: 'Mobile App Development',
      description: 'Build native iOS and Android applications',
      owner: memberUser1._id,
      members: [
        { userId: memberUser1._id, role: 'Admin' },
        { userId: adminUser._id, role: 'Member' },
      ],
      status: 'Active',
      dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    });
    await project2.save();

    console.log('📁 Created demo projects');

    // Create demo tasks
    const task1 = new Task({
      title: 'Design homepage layout',
      description: 'Create wireframes and mockups for the homepage',
      projectId: project1._id,
      assignedTo: memberUser1._id,
      status: 'In Progress',
      priority: 'High',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdBy: adminUser._id,
    });
    await task1.save();

    const task2 = new Task({
      title: 'Setup database schema',
      description: 'Design and implement MongoDB schema',
      projectId: project1._id,
      assignedTo: memberUser2._id,
      status: 'Todo',
      priority: 'High',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      createdBy: adminUser._id,
    });
    await task2.save();

    const task3 = new Task({
      title: 'Implement REST APIs',
      description: 'Build all required REST API endpoints',
      projectId: project2._id,
      assignedTo: memberUser1._id,
      status: 'Todo',
      priority: 'Medium',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      createdBy: memberUser1._id,
    });
    await task3.save();

    console.log('✅ Created demo tasks');

    // Create demo team
    const team1 = new Team({
      name: 'Development Team',
      description: 'Main development team for projects',
      owner: adminUser._id,
      members: [
        { userId: adminUser._id },
        { userId: memberUser1._id },
        { userId: memberUser2._id },
      ],
    });
    await team1.save();

    console.log('👥 Created demo teams');

    console.log('\n✨ Database seeded successfully!\n');
    console.log('Demo accounts:');
    console.log('  Admin: admin@example.com / password123');
    console.log('  User 1: john@example.com / password123');
    console.log('  User 2: jane@example.com / password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
