const { addTask, getTasks } = require("../service/task-service");

const taskResolver = {
  Query: {
    getTasks: async () => await getTasks(),
  },
  Mutation: {
    addTask: async (_, { taskInput }) => await addTask(taskInput),
  },
};

module.exports = taskResolver;
