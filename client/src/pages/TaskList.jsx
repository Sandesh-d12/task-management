import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useGetTask } from "../api/hooks/useTask";
import Table from "../components/Table";
import { useSelector } from "react-redux";

function TaskList() {
  const { allTask, loading, error } = useGetTask();
  const initialData = useSelector((state) => state.task.data);
  const [data, setData] = useState(initialData);
  useEffect(() => {
    setData(initialData);
  }, [allTask]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full">
        <p style={{ fontSize: "2rem", fontWeight: 500 }}>Task List</p>
        <Table d={data} />
      </div>
    </Layout>
  );
}

export default TaskList;
