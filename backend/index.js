const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connection = require("./config/dbConnection");
dotenv.config();
const app = express();
const cors = require("cors");

const taskRoute = require("./routes/task");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

connection();
// Middleware
app.use(express.json());
// cors
const corsOptions = {
  origin: process.env.APP_URL,
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/tasks", taskRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);

const PORT = process.env.PORT;
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
