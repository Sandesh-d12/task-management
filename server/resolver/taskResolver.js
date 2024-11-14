const { addTask, getTasks, updateTask, deleteTask, updateTasksState } = require("../service/task-service");

const taskResolver = {
  Query: {
    getTasks: async () => await getTasks(),
  },
  Mutation: {
    addTask: async (_, { taskInput }) => await addTask(taskInput),
    updateTask: async(_,{taskInput}) => await updateTask(taskInput),
    deleteTask: async(_, {deleteInput}) => await deleteTask(deleteInput),
    updateTasksState : async(_, {updateStateInput}) => await updateTasksState(updateStateInput)
  },
};

module.exports = taskResolver;
