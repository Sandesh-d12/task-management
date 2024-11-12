import React from "react";
import Layout from "../components/Layout";
import { DataTable } from "../components/Table";
import { useGetTask } from "../api/hooks/useTask";
import { Card } from "../components/card/TaskCard";

function TaskList() {
  const { loading, error, allTask } = useGetTask();
 React.useEffect(() => {}, [allTask]);
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h2>Task List</h2>
        <DataTable tableData={allTask} />
        {/* {allTask?.map((item, index) => (
          <Card
            title={item.title}
            id={1}
            name={"Admin"}
            priority={item.priority}
            time={item.estimation}
            type={item.issueType}
            key={index}
          />
        ))} */}
      </div>
    </Layout>
  );
}

export default TaskList;
