const { gql } = require("apollo-server");

const projectSchema = gql`
  type Project {
    id: ID!
    title: String!
    userId: String!
  }

  input ProjectInput {
    title: String!
    userId: String!
  }

  type AddProjectResponse {
    success: Boolean!
    message: String
    error: String
    project: Project
  }

    type Query {
    getProjects: [Project]
  }

  type Mutation {
    addProject(projectInput: ProjectInput!): AddProjectResponse!
  }
`;

module.exports = projectSchema;
