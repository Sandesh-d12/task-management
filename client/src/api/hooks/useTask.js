import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { CREATE_TASK, DELETE_TASK, GET_TASKS, UPDATE_TASK, UPDATE_TASK_STATE } from "../gql/queries/task";
import { toast } from "react-hot-toast";
import { setTasks } from "../../redux/taskSlice";
import { useDispatch } from "react-redux";

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
  const { data, loading, error } = useQuery(GET_TASKS);
  const dispatch = useDispatch();
  const allTask = data ? data.getTasks : null;
  dispatch(setTasks(allTask));
  return { allTask, loading, error };
};

export const useGetTaskFromId = (id) => {
  const { data, loading, error } = useQuery(GET_TASKS);
  const allTask = data ? JSON.parse(JSON.stringify(data?.getTasks)) : null;
  if (allTask) {
    const singleTask = allTask?.filter((item) => id == item.id);
    return singleTask;
  }
};

export const useUpdateTask = () => {
  const [updateTask, { data, loading, error }] = useMutation(UPDATE_TASK);

  const handleUpdateTask = async ({
    id,
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
      await updateTask({
        variables: {
          taskInput: {
            id,
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
      toast.success("task updated successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return { handleUpdateTask, data, loading, error };
};


export const useDeleteTask = () => {
  const [deleteTask, { data, loading, error }] = useMutation(DELETE_TASK, {
    refetchQueries: [
      { query: GET_TASKS }, 
    ],
    awaitRefetchQueries: true, 
  });
  const handleDeleteTask = async ({
    id,
 
  }) => {
    console.log(id);
    try {
      await deleteTask({
        variables: {
          deleteInput: {
            id,
          },
        },
      });
      toast.success("task deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return { handleDeleteTask, data, loading, error };
};

export const useUpdateTasksState = () => {
  const [updateTasks, { data, loading, error }] = useMutation(UPDATE_TASK_STATE);

  const handleUpdateTasksState = async ({ id, taskState = "done" }) => {
    console.log(id)
    try {
      await updateTasks({
        variables: {
          updateStateInput: {
            
            id,         
            taskState,  
          },
        },
      });
      toast.success("Tasks state updated successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to update tasks state");
    }
  };

  return { handleUpdateTasksState, data, loading, error };
};