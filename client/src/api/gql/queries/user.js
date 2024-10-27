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
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;
