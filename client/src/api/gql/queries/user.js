import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($signUpInput: SignUpInput!) {
    register(signUpInput: $signUpInput) {
      id
      name
      email
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      id
      email
      token
      name
    }
  }
`;

export const GET_USERS = gql`
  query {
    getAll {
    id
     name
     email  
    }
  }
`;