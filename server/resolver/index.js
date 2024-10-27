const taskResolver = require('./taskResolver');
const userResolver = require('./userResolver')

const resolvers = {
  Query: {
    ...taskResolver.Query,
  },
  Mutation: {
    ...taskResolver.Mutation,
    ...userResolver.Mutation
  },
};

module.exports = resolvers;
