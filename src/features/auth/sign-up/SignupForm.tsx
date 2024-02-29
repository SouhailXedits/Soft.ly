import React, { useEffect } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useSignUp } from "./useSignup";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../useUser";
import Loader from "../../../ui/Loader";
import { useQueryClient } from "@tanstack/react-query";
import { BsArrowLeft } from "react-icons/bs";
import { LoginFormValues } from "@/types/auth";

const LoginForm: React.FC = () => {
  const queryClient = useQueryClient();

  const { signup, isPending: signingUp } = useSignUp();
  const navigate = useNavigate();

  const { isLoading, role } = useUser();
  useEffect(
    function () {
      if (role !== "admin" && !isLoading) navigate("/");
    },
    [role, isLoading, navigate]
  );
  if (isLoading) return <Loader />;

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      signup(values);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex bg-white min-h-screen justify-between">
      <div className=" flex flex-col justify-between w-full items-center">
        <div className="flex flex-col basis-[60%] px-5 py-10 gap-5 relative w-[80%] md:w-full">
          <Link to="/users" className=" flex items-center gap-2 text-gray-500">
            <BsArrowLeft /> <span>Go back</span>
          </Link>
          <h1 className=" text-xl font-bold">Enter your user credantials</h1>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className=" flex flex-col gap-3">
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
              <div className=" flex items-center justify-between">
                <Link to="/users" className="border px-4 py-1.5 rounded">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={signingUp}
                  className=" p-2 rounded bg-gray-400 hover:bg-gray-600 transition-all"
                >
                  Create user
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div className=" flex flex-col basis-[40%] items-center bg-gray-100 px-4 py-10 gap-7 sm:hidden">
        <img src="/default-user.png" alt="default user image" />
      </div>
    </div>
  );
};

export default LoginForm;
