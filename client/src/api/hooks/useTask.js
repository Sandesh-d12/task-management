import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TASK, GET_TASKS } from "../gql/queries/task";
import { toast } from "react-hot-toast";
import { setTasks } from "../../redux/taskSlice";
import { useDispatch } from 'react-redux';

export const useCreateTask = () => {
  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK);

  const handleCreateTask = async ({
    title,
    content,
    priority,
    assignee,
    estimation,
    taskState,
    issueType,
    taskMonth,
  }) => {
    try {
      await createTask({
        variables: {
          taskInput: {
            title,
            content,
            priority,
            assignee,
            estimation,
            taskState,
            issueType,
            taskMonth,
          },
        },
      });
      toast.success("task created successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return { handleCreateTask, data, loading, error };
};


export const useGetTask = () => {
  const {data, loading, error} = useQuery(GET_TASKS)
  const dispatch = useDispatch()
  const allTask = data ? JSON.parse(JSON.stringify(data?.getTasks)) : null;
  dispatch(setTasks(allTask))
  return {allTask, loading, error}
}

export const useGetTaskFromId = (id) => {
  const {data, loading, error} = useQuery(GET_TASKS)
  const allTask = data ? JSON.parse(JSON.stringify(data?.getTasks)) : null;
  if(allTask){
    const singleTask = allTask?.filter((item)=>id == item.id)
    return singleTask
  }
  
}