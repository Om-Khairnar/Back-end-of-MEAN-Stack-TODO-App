const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: String,
  status: String,
  dueDate: {
    type: Date,
    required: true,
  },
  priority: String,
  description: String,
});

const Task = mongoose.model("tasks", userSchema);

module.exports = Task;
