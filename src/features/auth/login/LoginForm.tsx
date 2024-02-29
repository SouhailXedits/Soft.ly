import React from "react";
// import React, { useEffect } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";
import { useUser } from "../useUser";
// import Loader from "../../../ui/Loader";
import { LoginFormValues } from "../../../types/auth";
// import Loader from "@/ui/Loader";

// interface LoginFormValues {
//   email: string;
//   password: string;
// }

const LoginForm: React.FC = () => {
  const { login, isPending: loggingIn } = useLogin();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  if (isAuthenticated && !isLoading) navigate("/");

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const { email, password } = values;
      const userData = {
        email: email.trim(),
        password: password,
      };
      login(userData);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-gradient-to-br from-gray-700 p-3 to-gray-900 text-gray-50">
      <div className="Login flex md:flex-col shadow-lg shadow-black rounded-3xl  ">
        <div className=" flex flex-col gap-4 justify-center items-center bg-gray-500 p-[80px] md:p-[30px] pt-5 rounded-bl-3xl rounded-tl-3xl md:rounded-bl-none md:rounded-tr-3xl">
          <div>
            <div className=" mb-3">
              <img src="/logo.png" alt=" logo softly" className="w-[10rem]" />
            </div>
            <h3 className=" text-2xl text-center font-bold text-gray-100 drop-shadow-lg">
              Sign in Now
            </h3>
          </div>
          <div className=" flex flex-col gap-7 min-w-[300px]">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form className=" flex flex-col gap-2">
                <label htmlFor="email">E-mail</label>
                <Field
                  className=" form-input bg-transparent border"
                  name="email"
                  type="text"
                />
                <label htmlFor="password">Password</label>
                <Field
                  className=" form-input bg-transparent border"
                  name="password"
                  type="password"
                />
                <button
                  type="submit"
                  disabled={loggingIn}
                  className=" p-2 rounded bg-gray-400 mt-4 hover:bg-gray-600 transition-all"
                >
                  Login
                </button>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="bg-white flex flex-col justify-center items-center rounded-br-3xl rounded-tr-3xl md:rounded-tr-none md:max-w-[500px] md:rounded-br-3xl md:rounded-bl-3xl sm:p-5 max-w-[400px] text-gray-700 p-10">
          <h1 className=" text-3xl font-semibold text-center">
            {" "}
            Your Connections Platform{" "}
          </h1>
          <p className=" mt-10">
            {" "}
            By using the Softlink API, you will exercise the full power of your
            links through automated link customization and click analytics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
