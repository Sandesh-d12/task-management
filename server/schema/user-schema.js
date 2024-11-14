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

  input LoginInput {
    email: String!
    password: String!
  }
  type Query {
    getAll: [User]
  }
  type Mutation {
    register(signUpInput: SignUpInput!): User!
    login(loginInput: LoginInput): User!
  }
`;

module.exports = userSchema;
