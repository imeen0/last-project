const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 25 },
  description: { type: String, maxlength: 255 },
  status: {
    type: String,
    enum: ['open', 'in progress', 'pending', 'completed'],
    default: 'open',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (value) {
        const userExists = await mongoose.model('User').exists({ _id: value });
        return userExists;
      },
      message: 'User does not exist.',
    },
  },
  dueDate: {
    type: Date,
    validate: {
      validator: (value) => value > new Date(),
      message: 'Due date must be in the future.',
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
