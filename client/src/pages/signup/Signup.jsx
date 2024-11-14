import React from "react";
import { useAuth } from "../../api/hooks/useAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Layout from "../../components/Layout";
import CustomInput from "../../components/input/CustomInput";
import { Form, Formik } from "formik";
import Loading from "../../components/Loading";

const Signup = () => {
  const { handleRegisterUser, data, loading, error } = useAuth();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email Address").required("Required..!"),
    password: Yup.string().required("Required..!"),
    name: Yup.string().required("Required..!"),
  });

  const handleSubmit = (values) => {
    const { name, email, password } = values;
    handleRegisterUser({ name, email, password });
    toast.success("Successfully created account");
    navigate("/login");
  };
  return (
    <div className="mt-20 p-4 flex items-center justify-center">
      {
        loading && <Loading />
      }
      <div className="flex items-center justify-center flex-col bg-custom-gradient w-1/4 rounded-lg p-2 pb-6">
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <CustomInput type="email" label="Email" name="email" />
            <CustomInput type="name" label="Name" name="name" />
            <CustomInput type="password" label="Password" name="password" />
            <button
              type="submit"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-sm font-medium text-white"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
    </div>
  );
};

export default Signup;
