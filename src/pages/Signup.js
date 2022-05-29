import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const initVal = {
    userName: "",
    password: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2)
      .max(15)
      .required("Required"),
    password: Yup.string()
      .min(4)
      .max(20)
      .required("Required"),
  });

  const handleSubmit = async (data, { resetForm }) => {
    console.log("invoked submit signup");
    await axios.post(
      "https://react-mysql-blog-app.herokuapp.com/auth/signup",
      data
    );
    console.log(data);
    resetForm();
    navigate("/login");
  };

  return (
    <Container className="my-3 py-3 border border-3 w-75 rounded-3">
      <h3 className="mx-auto text-center">Sign Up</h3>
      <hr />
      <Formik
        validationSchema={validationSchema}
        initialValues={initVal}
        onSubmit={handleSubmit}
      >
        <Form className="mx-auto" style={{ maxWidth: "30rem" }}>
          <div>
            <label className="fw-bold">Username: </label>
            <ErrorMessage
              name="userName"
              component="p"
              className="text-danger"
            />
            <Field
              autoComplete="off"
              name="userName"
              placeholder="enter username..."
              type="text"
              className="form-control"
            />
          </div>

          <div>
            <label className="fw-bold mt-3">Password: </label>
            <ErrorMessage
              name="password"
              component="p"
              className="text-danger"
            />
            <Field
              autoComplete="off"
              name="password"
              placeholder="enter password..."
              type="password"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary my-3">
            Sign up
          </button>
        </Form>
      </Formik>
    </Container>
  );
};

export default Signup;
