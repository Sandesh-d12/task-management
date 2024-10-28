import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../gql/queries/task';
import { toast } from "react-hot-toast";


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
      toast.success('task created successfully')
    } catch (err) {
      toast.error( err.message);
    }
  };

  return { handleCreateTask, data, loading, error };
};

