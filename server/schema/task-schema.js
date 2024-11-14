const { gql } = require("apollo-server");

const taskSchema = gql`
  type Task {
    id: ID
    title: String!
    content: String!
    priority: String!
    assignee: String!
    estimation: String!
    taskState: String!
    issueType: String!
    createdAt: String
    updatedAt: String
  }

  input TaskInput {
    id: String
    title: String!
    content: String!
    priority: String!
    assignee: String!
    estimation: String!
    taskState: String!
    issueType: String!
  }

    input TaskStateInput {
    id: [ID]!
    taskState: String!
  }



  type AddTaskResponse {
    success: Boolean!
    message: String!
    task: Task
    error: String
  }

  type DeleteTaskResponse {
    success: Boolean!
    message: String!
    error: String
  }

  input DeleteInput {
    id: String!
  }

  type Query {
    getTasks: [Task]
  }

   type UpdateTasksStateResponse {
    success: Boolean!
    message: String!
    modifiedCount: Int
    error: String
  }

  type Mutation {
    addTask(taskInput: TaskInput!): AddTaskResponse!
    updateTask(taskInput: TaskInput!): AddTaskResponse!
    deleteTask(deleteInput: DeleteInput!): DeleteTaskResponse!
    updateTasksState(updateStateInput: TaskStateInput!): UpdateTasksStateResponse!
  }
`;

module.exports = taskSchema;
