import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useGetTask } from "../api/hooks/useTask";
import Table from "../components/Table";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const getProjectFromId = (id, projects) => {
  if (id && projects) {
    const project = projects.find((d) => d.id === id);
    return project;
  }
};

function TaskList() {
  const projectId = useSelector((state) => state?.auth?.currentProject);
  const projects = useSelector((state) => state?.auth?.project);
  const { tasks, loading, error } = useGetTask(projectId);

  const [data, setData] = useState(tasks);

  const currentProject = getProjectFromId(projectId, projects);


  useEffect(() => {
    setData(tasks);
  }, [tasks]);
  return (
    <Layout>
      {loading && <Loading />}
      <div className="flex flex-col items-center justify-center w-full">
        <p style={{ fontSize: "2rem", fontWeight: 500 }}>Task List</p>
        project name: {currentProject?.title}
        <Table d={data} />
      </div>
    </Layout>
  );
}

export default TaskList;
