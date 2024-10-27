const { gql } = require("apollo-server");

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    token: String
  }

  type Query {
    me: User
  }
  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }

  type Mutation {
    register(signUpInput: SignUpInput!): User!
    login(email: String!, password: String!): User!
  }
`;

module.exports = userSchema;
