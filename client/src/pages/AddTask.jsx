import React, { useState } from 'react';
import {useCreateTask} from "../api/hooks/useTask.js"
import { Form, Formik, } from 'formik'
import * as Yup from 'yup'
import CustomInput from '../components/input/CustomInput';
import Layout from '../components/Layout.jsx';
import Button from '../components/button/Button.jsx';

function AddTask() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { handleCreateTask, loading, error } = useCreateTask();
  const initialValues = {
    title:"",
    content: "",
  }
  const handleSubmit = (values) => {
    const {title, content} = values
    handleCreateTask({title, content}); 

  };
  const validationSchema = Yup.object({
    title: Yup.string().required("title is required"),
    content: Yup.string().required("content is required"),

  })
  return (
    <Layout>
    <div className="flex items-center justify-center w-full mt-5">
      <Formik initialValues={initialValues} validationSchema={validationSchema}onSubmit={handleSubmit}>
        {formik => (
          <Form className="w-1/6">
            <CustomInput type="text" label="title" name="title" />
            <CustomInput type="text" label="content" name="content" />
            <Button />
          </Form>
        )}
      </Formik>
    </div>
    </Layout>
  );
}

export default AddTask;
