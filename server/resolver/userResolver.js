const { logIn, signUp } = require('../service/user-service');

const userResolver = {
  Mutation: {
    register: async (_, { signUpInput }) => {
      return await signUp(signUpInput);
    },
    login: async (_, { loginInput}) => await logIn(loginInput),

  },
};

module.exports = userResolver;

