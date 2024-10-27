import { gql, useMutation } from "@apollo/client";

export const GET_TASKS = gql`
  query {
    getTasks {
      id
      title
      content
    }
  }
`;

export const CREATE_TASK = gql`
  mutation ($title: String!, $content: String!) {
    addTask(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;
