const taskResolver = require('./taskResolver');
const userResolver = require('./userResolver')

const resolvers = {
  Query: {
    ...taskResolver.Query,
    ...userResolver.Query
  },
  Mutation: {
    ...taskResolver.Mutation,
    ...userResolver.Mutation
  },
};

module.exports = resolvers;
