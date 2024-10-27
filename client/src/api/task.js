import { useMutation } from '@apollo/client';
import { CREATE_TASK } from './gql/queries/task';

export const useCreateTask = () => {
  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK);

  const handleCreateTask = async ({title, content}) => {
    try {
      await createTask({
        variables: {
          title,
          content,
        },
      });
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return { handleCreateTask, data, loading, error };
};

