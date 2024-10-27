const taskSchema = require('./task-schema.js');
const userSchema = require('./user-schema.js');

const { gql } = require('apollo-server');

const typeDefs = gql`
  ${taskSchema}
  ${userSchema}
`;

module.exports = typeDefs;
