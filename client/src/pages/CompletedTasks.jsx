import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useGetTask } from "../api/hooks/useTask";
import Table from "../components/Table";


function CompletedTasks() {
  const { allTask, loading, error } = useGetTask();

  const [data, setData] = useState(allTask);
  useEffect(() => {
    const pendingTasks = allTask?.filter((item)=> item.taskState == "done")
    setData(pendingTasks);
  }, [allTask]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full">
        <p style={{ fontSize: "2rem", fontWeight: 500 }}>Completed Tasks</p>
        <Table d={data} />
      </div>
    </Layout>
  );
}

export default CompletedTasks;
