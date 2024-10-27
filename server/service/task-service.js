const Task = require('../database/model/Task');

const addTask = async (title, content) => {
  const task = new Task({ title, content });
  return await task.save();
};

const getTasks = async () => {
  return await Task.find();
};

module.exports = {
  addTask,
  getTasks,
};
