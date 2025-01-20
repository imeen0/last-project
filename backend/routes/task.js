const express = require('express');
const Task = require('../models/task');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create a new task
router.post('/', authenticate, async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user._id });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all tasks (filter by status, dueDate)
router.get('/', authenticate, async (req, res) => {
  try {
    const filters = { userId: req.user._id };

    if (req.query.status) {
      filters.status = req.query.status;
    }
    if (req.query.dueDate) {
      filters.dueDate = { $lte: new Date(req.query.dueDate) };
    }

    const tasks = await Task.find(filters);
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get task by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).send({ error: 'Task not found' });
    res.send(task);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update task
router.patch('/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).send({ error: 'Task not found' });
    res.send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete task
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).send({ error: 'Task not found' });
    res.send({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
