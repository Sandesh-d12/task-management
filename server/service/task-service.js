const Task = require("../database/model/Task");

const addTask = async ({
  title,
  content,
  priority,
  assignee,
  estimation,
  taskState,
  issueType,
}) => {
  if (!title || !content || !priority || !assignee || !estimation || !taskState || !issueType) {
    throw new Error("All fields are required");
  }

  const task = new Task({
    title,
    content,
    priority,
    assignee,
    estimation,
    taskState,
    issueType,
  });

  try {
    const savedTask = await task.save();

    return {
      success: true,
      message: "Task added successfully!",
      task: savedTask,
    };
  } catch (error) {
    console.error("Error saving task:", error.message);

    return {
      success: false,
      message: "Failed to add task",
      error: error.message,
    };
  }
};

const getTasks = async () => {
  return await Task.find();
};

module.exports = {
  addTask,
  getTasks,
};
