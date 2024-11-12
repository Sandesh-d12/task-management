import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom"; 
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import { UpdateTask } from "./pages/UpdateTask";
import Table from "./components/Table";

export function AllRoute() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      {token ? (
          <Route element={<Navbar />} >
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/test" element={<Table  />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}
