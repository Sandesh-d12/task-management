const { logIn, signUp } = require('../service/user-service');

const userResolver = {
  Mutation: {
    register: async (_, { signUpInput }) => {
      console.log('Received Inputs:', signUpInput);
      return await signUp(signUpInput);
    },
    login: async (_, { email, password }) => await logIn(email, password),

  },
};

module.exports = userResolver;

