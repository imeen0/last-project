const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task');
const dotenv=require("dotenv");
const connection=require("./config/dbConnection")
dotenv.config()
const app = express();


connection()
// Middleware
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

const PORT=process.env.PORT
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
