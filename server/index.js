const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/schema.js');
const resolvers = require('./resolver');
const connectDB = require('./database/config.js');

require('dotenv').config();
connectDB();

const userContext = ({ req }) => {
  const token = req.headers.authorization || '';
  if (token) {
    try {
      const user = jwt.verify(token, 'SECRET_KEY');
      return { user };
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
  return {};
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: userContext
});




server.listen({ port: process.env.PORT || 9000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
