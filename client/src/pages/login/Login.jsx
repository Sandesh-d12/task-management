import React from "react";
import { useAuth } from "../../api/hooks/useAuth";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/input/CustomInput";
import Loading from "../../components/Loading";
import { toast } from "react-hot-toast";

const Login = () => {
  const { handleLogin, loginLoading } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    const { email, password } = values;
    handleLogin({ email, password });
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email Address").required("Required..!"),
    password: Yup.string().required("Required..!"),
  });

  return (
    <>
      <div className="mt-20 p-4 flex items-center justify-center">
        {loginLoading && <Loading />}
        <div className="flex items-center justify-center flex-col bg-custom-gradient w-1/4 rounded-lg p-2 pb-6">
          <h1>Login</h1>
          <div className="flex items-center justify-center ">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="">
                  <CustomInput type="email" label="Email" name="email" />
                  <CustomInput
                    type="password"
                    label="Password"
                    name="password"
                  />
                  <div>
                    Don't have account?{" "}
                    <a href="/signUp" style={{ color: "blue" }}>
                      Sign Up
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-sm font-medium text-white"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
