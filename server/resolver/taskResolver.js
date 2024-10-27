const { addTask, getTasks } = require('../service/task-service');

const taskResolver = {
  Query: {
    getTasks: async () => await getTasks(),
  },
  Mutation: {
    addTask: async (_, { title, content }) => await addTask(title, content),
  },
};

module.exports = taskResolver;
