import React, { useEffect } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {useSignUp} from './useSignup'
import { useNavigate } from "react-router-dom";
import { useUser } from "../useUser";
import Loader from "../../../ui/Loader";
import { LoginFormValues } from "../../../types";
import { useQueryClient } from "@tanstack/react-query";



const LoginForm: React.FC = () => {
  const queryClient = useQueryClient()
  


  const { signup, isPending : signingUp } = useSignUp();
  const navigate = useNavigate();

  const { isLoading, role } = useUser();
  useEffect(
    function () {
      if (role !== 'admin' && !isLoading) navigate("/");
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
      queryClient.invalidateQueries({queryKey: ["users"]})
      navigate('/create-user')

    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center bg-gradient-to-br from-gray-300 to-gray-400 text-gray-50">
      <div className="Login flex shadow-md shadow-black rounded-3xl  ">
        <div className=" flex flex-col gap-4 justify-center items-center bg-gray-500 p-[80px] mdl:p-[40px] sm:p-[10px] pt-5 rounded-bl-3xl rounded-tl-3xl lg:rounded-3xl ">
          <div>
            <div className=" mb-3">
              <img
                src="/logo.png"
                alt=" logo softly"
                className="w-[10rem]"
              />
            </div>
            <h3 className=" text-2xl text-center font-bold text-gray-100 drop-shadow-lg">
              Register new user
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
                  disabled={signingUp}
                  className=" p-2 rounded bg-gray-400 mt-4 hover:bg-gray-600 transition-all"
                >
                  Create user
                </button>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="bg-white flex flex-col justify-center items-center rounded-br-3xl rounded-tr-3xl max-w-[400px] text-gray-700 p-10 lg:hidden">
          <h1 className=" text-3xl font-semibold text-center">
            {" "}
            Your Connections Platform{" "}
          </h1>
          <p className=" mt-10">
            {" "}
            By using the Softly API, you will exercise the full power of your
            links through automated link customization and
            click analytics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
