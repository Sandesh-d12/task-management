const projectResolver = require('./projectResolver');
const taskResolver = require('./taskResolver');
const userResolver = require('./userResolver')

const resolvers = {
  Query: {
    ...taskResolver.Query,
    ...userResolver.Query,
    ...projectResolver.Query
  },
  Mutation: {
    ...taskResolver.Mutation,
    ...userResolver.Mutation,
    ...projectResolver.Mutation
  },
};

module.exports = resolvers;
