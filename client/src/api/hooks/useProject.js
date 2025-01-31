import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../gql/queries/project";
import { toast } from "react-hot-toast";
import {  useDispatch, useSelector } from "react-redux";
import { setProject } from "../../redux/authSlice";
import { useEffect } from "react";


export const useCreateProject = () => {
    const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT);
      const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.data);

  
    const handleCreateProject = async ({
      title,
    }) => {
      try {
        await createProject({
          variables: {
            projectInput: {
              title,
              userId:user?.id
            },
          },
        });
        toast.success("project created successfully");
        // dispatch(setProject(data));

      } catch (err) {
        toast.error(err.message);
      }
    };
  
    return { handleCreateProject, data, loading, error };
  };


  
export const useGetProjects = () => {
  const { data, loading, error, refetch } = useQuery(GET_PROJECTS, {
    fetchPolicy: "network-only", // Ensures fresh data is always fetched
  });

  const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.data);
  
  const allProjects = data ? data?.getProjects : null;
  const projects = allProjects?.filter((d)=>d?.userId == user?.id)

// console.log('allP',allProjects)
  dispatch(setProject(projects));


  return { projects, loading, error };
};