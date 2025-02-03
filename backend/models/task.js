const mongoose = require("mongoose");
const taskScema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    important: {
      type: Boolean,
      default: false,
    },
  }
  //timestamps
);
module.exports = mongoose.model("task", taskScema);
