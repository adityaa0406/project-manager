const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['Todo', 'In Progress', 'Done', 'Overdue'],
    default: 'Todo',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  dueDate: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update overdue tasks
taskSchema.pre('find', function() {
  const now = new Date();
  this.updateMany(
    { dueDate: { $lt: now }, status: { $ne: 'Done' } },
    { status: 'Overdue' }
  );
});

module.exports = mongoose.model('Task', taskSchema);
