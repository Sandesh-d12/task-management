const projectSchema = require('./project-schema.js');
const taskSchema = require('./task-schema.js');
const userSchema = require('./user-schema.js');

const { gql } = require('apollo-server');

const typeDefs = gql`
  ${taskSchema}
  ${userSchema}
  ${projectSchema}
`;

module.exports = typeDefs;
