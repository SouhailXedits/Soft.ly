import React, { useEffect } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useLogin, useLoginWithGoogle } from "./useLogin";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../useUser";
import Loader from "../../../ui/Loader";
import { BsGoogle } from "react-icons/bs";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login, isPending: loggingIn } = useLogin();
  const { login: loginWithGoogle, isPending } = useLoginWithGoogle();
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (isAuthenticated && !isLoading) navigate("/");
    },
    [isAuthenticated, isLoading, navigate]
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
      login(values);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setSubmitting(false);
    }
  };
  function handleGoogleLogin() {
    loginWithGoogle();
  }

  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-900 text-gray-50">
      <div className="Login flex shadow-lg shadow-black rounded-3xl  ">
        <div className=" flex flex-col gap-4 justify-center items-center bg-gray-500 p-[80px] pt-5 rounded-bl-3xl rounded-tl-3xl ">
          <div>
            <div className=" mb-3">
              <img
                src="/Logo-Softly.png"
                alt=" logo softly"
                className="w-[10rem]"
              />
            </div>
            <h3 className=" text-2xl text-center font-bold text-gray-100 drop-shadow-lg">
              Sign in Now
            </h3>
          </div>
          <div className=" flex flex-col gap-7 min-w-[300px]">
            <button
              onClick={handleGoogleLogin}
              disabled={isPending}
              className=" flex items-center gap-3 bg-gray-100 text-green-700 p-2 rounded justify-center "
            >
              <BsGoogle />
              Login with google
            </button>
            <Link to='/signup' className=' underline'>Didn't have an account ?</Link>
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
        <div className="bg-white flex flex-col justify-center items-center rounded-br-3xl rounded-tr-3xl max-w-[400px] text-gray-700 p-10">
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
