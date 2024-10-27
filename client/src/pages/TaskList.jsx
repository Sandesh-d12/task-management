import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../api/gql/queries/task';

function TaskList() {
  const { loading, error, data } = useQuery(GET_TASKS);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {data?.getTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
