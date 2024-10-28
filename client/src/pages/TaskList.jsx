import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../api/gql/queries/task';
import Layout from '../components/Layout';

function TaskList() {
  const { loading, error, data } = useQuery(GET_TASKS);

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center'>
      <h2>Task List</h2>
      <ul>
        {data?.getTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.content}
          </li>
        ))}
      </ul>
      <ul>
        {data?.getTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.content}
          </li>
        ))}
      </ul>
      <ul>
        {data?.getTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.content}
          </li>
        ))}
      </ul>
      <ul>
        {data?.getTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.content}
          </li>
        ))}
      </ul>
      <ul>
        {data?.getTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.content}
          </li>
        ))}
      </ul>
      <ul>
        {data?.getTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.content}
          </li>
        ))}
      </ul>
      </div>
    </Layout>
  );
}

export default TaskList;
