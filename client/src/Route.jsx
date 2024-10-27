import React from "react";
import { Route, Routes } from "react-router-dom";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

export function AllRoute() {
  return (
    <Routes>
    {/* <Route element={<AddTask />}> */}
      <Route path="/" element={<AddTask />} />
      <Route path="/allTask" element={<TaskList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

    {/* </Route> */}
    </Routes>
  );
}
