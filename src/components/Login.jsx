import { useState, useEffect } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// import { Helmet, HelmetProvider } from "react-helmet-async";
import useAxios from "../customHook/useAxios";

function LoginForm() {
  const httpService = useAxios()
  const navigate = useNavigate();


  const handleSubmit = async (values) => {
    const data = await httpService.post("/users/login",values)
  if (data.success) {
    const user = data.body.user;
    localStorage.user = JSON.stringify(user);
    localStorage.accessToken = user.accessToken;
    localStorage.refreshToken = user.refreshToken;
    navigate("/");
  } else {
    toast.error(data.message);
  }
  };

  return (
    <div className="container ">
      <h2 className="text-center">Login</h2>
      <Formik
        initialValues={{
          username: "",
          password: "",
          token: "",
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form className="login-form">
          <div className="my-2">
            <label className="control-label">Username</label>
            <Field name="username" className="form-control" type="text" required />
            <ErrorMessage name="username" render={(msg) => <div className="error-message">{msg}</div>} />
          </div>
          <div className="mb-3">
            <label className="control-label">Password</label>
            <Field name="password" className="form-control" type="text" required />
            <ErrorMessage name="password" render={(msg) => <div className="error-message">{msg}</div>} />
          </div>
          <div className="mb-3">
            <label className="control-label">2FA Authentication</label>
            <Field name="token" className="mt-2 form-control" type="text" placeholder="If Actived" />
          </div>
          <div className="my-2">
            <button className="btn btn-primary w-100" type="submit">
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
