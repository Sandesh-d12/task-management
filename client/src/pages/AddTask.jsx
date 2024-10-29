import React, { useState } from "react";
import { useCreateTask } from "../api/hooks/useTask.js";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/input/CustomInput";
import Layout from "../components/Layout.jsx";
import Button from "../components/button/Button.jsx";
import { Select } from "../components/input/Select.jsx";

export const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  priority: Yup.string().required("Priority is required"),
  assignee: Yup.string().required("Assignee is required"),
  estimation: Yup.string().required("Estimation is required"),
  taskState: Yup.string().required("Task State is required"),
  issueType: Yup.string()
    .required("Issue Type is required")
});

export const issueOptions = [
  {
    label: "Select One",
    value: "",
  },
  {
    label: "Bug",
    value: "bug",
  },
  {
    label: "Feature",
    value: "feature",
  },
  {
    label: "Optimization",
    value: "optimization",
  },
];

export const taskOptions = [
  {
    label: "Select One",
    value: "",
  },
  {
    label: "Backlog",
    value: "backlog",
  },
  {
    label: "In Progress",
    value: "in_progress",
  },
  {
    label: "Test",
    value: "test",
  },
  {
    label: "Done",
    value: "done",
  },
];

export const priorityOptions = [
  {
    label: "Select One",
    value: "",
  },
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "Critical",
    value: "critical",
  },
  {
    label: "Major",
    value: "major",
  },
  {
    label: "Minor",
    value: "minor",
  },
]

function AddTask() {
  const { handleCreateTask, loading, error } = useCreateTask();
  const initialValues = {
    title: "",
    content: "",
    priority: "",
    assignee: "",
    estimation: "",
    taskState: "",
    issueType: "",
  };
  const handleSubmit = (values, { resetForm }) => {
    const {
      title,
      content,
      priority,
      assignee,
      estimation,
      taskState,
      issueType,
    } = values;
    handleCreateTask({
      title,
      content,
      priority,
      assignee,
      estimation,
      taskState,
      issueType,
    });
    resetForm();
  };

  return (
    <Layout>
      <div className="flex items-center justify-center w-full mt-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="w-1/6">
              <CustomInput type="text" label="title" name="title" />
              <CustomInput type="text" label="content" name="content" />
              <CustomInput type="text" label="assignee" name="assignee" />
              <CustomInput type="text" label="estimation" name="estimation" />
              <Select
                option={taskOptions}
                name="taskState"
                label="Task State"
              />
               <Select
                option={priorityOptions}
                name="priority"
                label="Priority"
              />
              <Select
                option={issueOptions}
                name="issueType"
                label="Issue Type"
              />
              <Button />
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}

export default AddTask;
