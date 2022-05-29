import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      className="bg-main p-3 mt-5 text-center align-middle fixed-bottom"
    >
      <div>
        <p className="mx-auto text-light letter-spacing-1 my-auto footer-main">
          Developed by Phary Phal Copyright@2022
        </p>
      </div>
    </Container>
  );
};

export default Footer;
