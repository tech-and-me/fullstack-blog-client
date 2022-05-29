import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "./../helpers/AuthContext";
import Login from "./Login";

const CreatePost = () => {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const initialFormValues = {
    userName: "",
    title: "",
    postText: "",
  };
  const [showMessage, setShowMessage] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let errors = {};

    //name field
    if (!formValues.title) {
      errors.title = "Title is required";
    }

    //Post Content field
    if (!formValues.postText) {
      errors.postText = "Content cannot be empty";
    }

    //username  (no need to validate this since we have set that if not login, cant create post. so when user login, we grab userName from authState)
    if (!formValues.userName) {
      errors.userName = "username cannot be empty";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);

    if (validate(formValues)) {
      setFormValues(initialFormValues);
      setShowMessage(true);
      console.log("...1");
      const response = await axios.post(
        "https://react-mysql-blog-app.herokuapp.com/posts",
        formValues,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      console.log(
        "2...Data sent to database successfully! Here is the response sent to DB for your record : ",
        response
      );

      setTimeout(() => {
        console.log("...3");
        setShowMessage(false);
        console.log(showMessage);
        navigate("/");
      }, 700);
    } else {
      setShowMessage(false);
    }
  };

  return (
    <>
      {!authState.status ? (
        navigate("/login")
      ) : (
        <Container className="text-center py-3 my-2 w-50 border border-secondary border-2">
          <Row>
            <Col className="text-start " md="auto">
              <h3>Create Post</h3>
            </Col>
            <Col>
              {showMessage && (
                <p className="text-success text-end px-5 fst-italic">
                  <span className="pe-2">
                    <FaCheckCircle size={"1.5rem"} />
                  </span>
                  form submitted successfully
                </p>
              )}
            </Col>
          </Row>
          <hr></hr>

          <Form onSubmit={handleSubmit} className="w-75 mx-auto">
            <Form.Group controlId="formGridTitle" className="my-3">
              <Form.Control
                name="title"
                placeholder="Title"
                type="text"
                value={formValues.title}
                onChange={handleChange}
              />
              {formErrors.title && (
                <p className="text-danger">{formErrors.title}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formGridEmail" className="mb-3">
              <Form.Control
                as="textarea"
                name="postText"
                placeholder="Post Content"
                type="text"
                rows={5}
                value={formValues.postText}
                onChange={handleChange}
              />
              {formErrors.postText && (
                <p className="text-danger">{formErrors.postText}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formGridName" className="mb-3">
              <Form.Control
                name="userName"
                type="text"
                autoFocus
                value={authState.userName}
                readOnly
                onFocus={handleChange}
              />
              {formErrors.userName && (
                <p className="text-danger">{formErrors.userName}</p>
              )}
            </Form.Group>

            <Button
              type="submit"
              variant="secondary"
              size="md"
              className="mb-3"
            >
              Submit
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
};

export default CreatePost;
