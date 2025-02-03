const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user");

// Create a task and assign it to a user
router.post("/create", async (req, res) => {
  try {
    const { userId, title, desc, dueDate, important } = req.body;

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newTask = new Task({ title, desc, dueDate, important });
    const savedTask = await newTask.save();

    // Assign task to user
    user.tasks.push(savedTask._id);
    await user.save();

    res.status(201).json({ message: "Task created", task: savedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all tasks for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate user existence
    const user = await User.findById(userId).populate("tasks");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ tasks: user.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a task
router.put("/update/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, desc, dueDate, important, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, { title, desc, dueDate, important, status }, { new: true });

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a task and remove it from the user's list
router.delete("/delete/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });

    // Remove task reference from all users
    await User.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
