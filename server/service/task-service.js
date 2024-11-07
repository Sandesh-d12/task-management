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
  if (
    !title ||
    !content ||
    !priority ||
    !assignee ||
    !estimation ||
    !taskState ||
    !issueType
  ) {
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

const updateTask = async (data) => {
  const {
    id,
    title,
    content,
    priority,
    assignee,
    estimation,
    taskState,
    issueType,
  } = data;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, content, priority, assignee, estimation, taskState, issueType },
      { new: true }
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }
    return {
      success: true,
      message: "Task updated successfully!",
      task: updatedTask,
    };
  } catch (error) {
    console.error("Error updating task:", error.message);

    return {
      success: false,
      message: "Failed to update task",
      error: error.message,
    };
  }
};

const deleteTask = async (data) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(data?.id);

    if (!deletedTask) {
      throw new Error("Task not found");
    }

    return {
      success: true,
      message: "Task deleted successfully!",
      task: deletedTask,
    };
  } catch (error) {
    console.error("Error deleting task:", error.message);

    return {
      success: false,
      message: "Failed to delete task",
      error: error.message,
    };
  }
};

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
};
