import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Container className="my-5 p-5 text-center border border-2">
      <h1>Oop! Page Not Found</h1>

      <h6 className="my-4 py-2 fst-italic">
        Go to the Home Page: <Link to="/">Home Page</Link>
      </h6>
    </Container>
  );
};

export default PageNotFound;
