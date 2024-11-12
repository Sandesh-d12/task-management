import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useGetTaskFromId } from "../api/hooks/useTask";
import CustomInput from "../components/input/CustomInput";
import { Select } from "../components/input/Select";
import { Form, Formik } from "formik";
import Button from "../components/button/Button";
import { validationSchema, issueOptions, taskOptions } from "./AddTask";
import ConfirmModal from "../components/modal/Modal";
import { useUpdateTask } from "../api/hooks/useTask";

export const UpdateTask = () => {
  const { id } = useParams();
  const data = useGetTaskFromId(id);
  const [updatedData, setUpdatedData] = useState();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const { handleUpdateTask } = useUpdateTask();

  // Set initial values directly from data
  const initialValues =
    data?.length > 0
      ? {
          id: data[0].id || "",
          title: data[0]?.title || "",
          content: data[0]?.content || "",
          priority: data[0]?.priority || "",
          assignee: data[0]?.assignee || "",
          estimation: data[0]?.estimation || "",
          taskState: data[0]?.taskState || "",
          issueType: data[0]?.issueType || "",
        }
      : {
          id: "",
          title: "",
          content: "",
          priority: "",
          assignee: "",
          estimation: "",
          taskState: "",
          issueType: "",
        };

  const handleSubmit = (values, { resetForm }) => {
    setConfirmationOpen(true);
    setUpdatedData(values);
    console.log(values);
  };

  const handleConfirmUpdate = () => {
    handleUpdateTask(updatedData);
    setConfirmationOpen(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="w-1/6">
              <CustomInput type="text" label="Title" name="title" />
              <CustomInput type="text" label="Content" name="content" />
              <CustomInput type="text" label="Priority" name="priority" />
              <CustomInput type="text" label="Assignee" name="assignee" />
              <CustomInput type="text" label="Estimation" name="estimation" />
              <Select
                option={taskOptions}
                name="taskState"
                label="Task State"
              />
              <Select
                option={issueOptions}
                name="issueType"
                label="Issue Type"
              />
              <Button type="submit" text="Update" />
            </Form>
          )}
        </Formik>

        {confirmationOpen && (
          <ConfirmModal
            isOpen={confirmationOpen}
            onClose={() => setConfirmationOpen(false)}
            title="Confirm Update"
            message="Are you sure you want to update this task?"
            onConfirm={handleConfirmUpdate}
          />
        )}
      </div>
    </Layout>
  );
};
