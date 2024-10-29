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
    title: String!
    content: String!
    priority: String!
    assignee: String!
    estimation: String!
    taskState: String!
    issueType: String!
  }

    type AddTaskResponse {
    success: Boolean!
    message: String!
    task: Task  
    error: String
  }

  type Query {
    getTasks: [Task]
  }

  type Mutation {
    addTask(taskInput: TaskInput!): AddTaskResponse!
  }
`;

module.exports = taskSchema;


