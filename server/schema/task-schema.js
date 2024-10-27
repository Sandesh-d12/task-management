const { gql } = require('apollo-server');

const taskSchema = gql`
  type Task {
    id: ID!
    title: String!
    content: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getTasks: [Task]
  }

  type Mutation {
    addTask(title: String!, content: String!): Task
  }
`;

module.exports = taskSchema;
