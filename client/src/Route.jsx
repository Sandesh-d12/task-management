import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import { UpdateTask } from "./pages/UpdateTask";
import Table from "./components/Table";
import PendingTasks from "./pages/PendingTasks";
import CompletedTasks from "./pages/CompletedTasks";
import CreateProject from "./pages/CreateProject";
import PrivateRoute from "./PrivateRoute"; 
import SelectProject from "./pages/SelectProject";

export function AllRoute() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<Navbar />}>
          <Route path="/" element={<TaskList />} />
          <Route path="/pending-tasks" element={<PendingTasks />} />
          <Route path="/completed-tasks" element={<CompletedTasks />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/test" element={<Table />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
          <Route path="/create-project" element={<CreateProject />} />
          {/* <Route path="/select-project" element={<SelectProject />} /> */}

          
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" />} />
      {/* <Route path="/create-project" element={<CreateProject />} /> */}

    </Routes>
  );
}
