import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useGetTask } from "../api/hooks/useTask";
import Table from "../components/Table";
import Loading from "../components/Loading";

function TaskList() {
  const { allTask, loading, error } = useGetTask();

  const [data, setData] = useState(allTask);
  useEffect(() => {
    setData(allTask);
  }, [allTask]);

  return (
    <Layout>
      {
        loading && <Loading />
      }
      <div className="flex flex-col items-center justify-center w-full">
        <p style={{ fontSize: "2rem", fontWeight: 500 }}>Task List</p>
        <Table d={data} />
      </div>
    </Layout>
  );
}

export default TaskList;
