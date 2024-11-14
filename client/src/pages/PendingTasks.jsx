import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useGetTask } from "../api/hooks/useTask";
import Table from "../components/Table";
import Loading from "../components/Loading";


function PendingTasks() {
  const { allTask, loading, error } = useGetTask();

  const [data, setData] = useState(allTask);
  useEffect(() => {
    const pendingTasks = allTask?.filter((item)=> item.taskState !== "done")
    setData(pendingTasks);
  }, [allTask]);

  return (
    <Layout>
      {loading && <Loading />}
      <div className="flex flex-col items-center justify-center w-full">
        <p style={{ fontSize: "2rem", fontWeight: 500 }}>Pending Tasks</p>
        <Table d={data} variant={"pending"}/>
      </div>
    </Layout>
  );
}

export default PendingTasks;
