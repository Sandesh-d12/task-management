const { logIn, signUp, getUsers } = require('../service/user-service');
const User = require("../database/model/User");

const userResolver = {
  Query: {
    getAll: async () => {
      // Ensure proper syntax for returning data
      return await User.find();
    },
  },
  Mutation: {
    register: async (_, { signUpInput }) =>  await signUp(signUpInput),
    login: async (_, { loginInput}) => await logIn(loginInput),

  },
};

module.exports = userResolver;

