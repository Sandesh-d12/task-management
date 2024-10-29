const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    priority: {
      type: String,
      required: true,
    },
    assignee: { type: String, required: true },
    estimation: { type: String, required: true },
    taskState: { type: String, required: true },
    issueType: { type: String, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
