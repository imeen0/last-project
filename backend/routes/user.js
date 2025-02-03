const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("tasks");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("tasks");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email, password }, { new: true }).populate("tasks");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
