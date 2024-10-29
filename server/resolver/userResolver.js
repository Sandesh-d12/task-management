const { logIn, signUp } = require('../service/user-service');

const userResolver = {
  Mutation: {
    register: async (_, { signUpInput }) =>  await signUp(signUpInput),
    login: async (_, { loginInput}) => await logIn(loginInput),

  },
};

module.exports = userResolver;

