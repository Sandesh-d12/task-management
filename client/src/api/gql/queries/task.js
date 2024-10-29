import { gql, useMutation } from "@apollo/client";

export const GET_TASKS = gql`
  query {
    getTasks {
    id
       title
      content
      priority
      assignee
      estimation
      taskState
      issueType
      createdAt
    }
  }
`;

export const CREATE_TASK = gql`
  mutation ($taskInput: TaskInput!) {
    addTask(taskInput: $taskInput) {
    success
    message
    task {
      id
      title
      content
      priority
      assignee
      estimation
      taskState
      issueType
      createdAt
      updatedAt
    }
    error
    }
  }
`;
