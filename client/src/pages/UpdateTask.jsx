import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useGetTaskFromId } from "../api/hooks/useTask";
import CustomInput from "../components/input/CustomInput";
import { Select } from "../components/input/Select";
import { Form, Formik } from "formik";
import Button from "../components/button/Button";
import { validationSchema, issueOptions, taskOptions, priorityOptions } from "./AddTask";
import ConfirmModal from "../components/modal/Modal";
import { useUpdateTask } from "../api/hooks/useTask";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

export const UpdateTask = () => {
  const { id } = useParams();
  const data = useGetTaskFromId(id);
  const users = useSelector((state) => state.users.data);
  const [updatedData, setUpdatedData] = useState();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const { handleUpdateTask, loading, error } = useUpdateTask();
  const [showUpdateButton, setShowUpdateButton] = useState(false)

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

   const handleUpdate = () =>{
setShowUpdateButton(true)
  }

  return (
    <Layout>
      {
        loading && <Loading />
      }
      <div className="flex flex-col items-center justify-center">
     {!showUpdateButton && <Button handleClick={handleUpdate} text="Update" /> }

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="w-1/6">
              <CustomInput type="text" label="Title" name="title" disabled={!showUpdateButton}/>
              <CustomInput type="text" label="Content" name="content" disabled={!showUpdateButton}/>
              <Select
                option={priorityOptions.filter((item)=>{
                  return(
                    item.label !== 'Select One'
                  )
                })}
                name="priority"
                label="Priority"
                disabled={!showUpdateButton}
              />
              <Select
                option={users?.map((user) => ({
                  label: user?.name,
                  value: user?.name,
                }))}
                name="assignee"
                label="Assignee"
                disabled={!showUpdateButton}
              />
              <CustomInput type="text" label="Estimation" name="estimation" disabled={!showUpdateButton}/>
              <Select
                option={taskOptions.filter((item)=>{
                  return(
                    item.label !== 'Select One'
                  )
                })}
                name="taskState"
                label="Task State"
                disabled={!showUpdateButton}
              />
              <Select
                option={issueOptions}
                name="issueType"
                label="Issue Type"
                disabled={!showUpdateButton}
              />
              <div style={{display:"flex", justifyContent:"space-between"}}>
              {showUpdateButton && <Button type="submit" text="Submit" /> }
              {showUpdateButton && <Button handleClick={()=>setShowUpdateButton(false)} text="Cancel" /> }
              </div>
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
