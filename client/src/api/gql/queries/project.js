import { gql, useMutation } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation ($projectInput: ProjectInput!) {
    addProject(projectInput: $projectInput) {
      success
      message
      error
      project {
        id
        title
        userId
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query {
    getProjects {
      id
      title
      userId
    }
  }
`;
