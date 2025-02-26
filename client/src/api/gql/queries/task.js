import { gql, useMutation } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks($projectId: String!) { 
    getTasks(projectId: $projectId) {   
      id
      title
      content
      priority
      assignee
      estimation
      taskState
      issueType
      createdAt
      projectId
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
      projectId
    }
    error
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation ($taskInput: TaskInput!) {
    updateTask(taskInput: $taskInput) {
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

export const DELETE_TASK = gql`
  mutation ($deleteInput: DeleteInput!) {
    deleteTask(deleteInput: $deleteInput) {
    success
    message
    error
    }
  }
`;


export const UPDATE_TASK_STATE = gql`
  mutation ($updateStateInput: TaskStateInput!) {
    updateTasksState(updateStateInput: $updateStateInput) {
      success
      message
      error
    }
  }
`;
