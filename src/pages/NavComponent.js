import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { AuthContext } from "../helpers/AuthContext";

const NavComponent = () => {
  const { authState } = useContext(AuthContext);
  return (
    <Container fluid className="bg-secondary">
      <Container className="text-light">
        <div className="py-3 d-flex flex-row justify-content-between">
          <div>
            <Link to="/post" className="text-light pe-4 text-decoration-none">
              Home
            </Link>
            {authState.status && (
              <Link
                to="/post/create"
                className="text-light pe-4 text-decoration-none"
              >
                Create Post
              </Link>
            )}
          </div>

          {authState.userName ? (
            <div>Hello {authState.userName} ! Welcome to our blog !</div>
          ) : (
            "You are not logged in."
          )}

          <div>
            {!authState.status ? (
              <>
                <Link
                  to="/login"
                  className="text-light pe-4 text-decoration-none"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-light pe-4 text-decoration-none"
                >
                  Signup
                </Link>
              </>
            ) : (
              <Link
                to="/logout"
                className="text-light pe-4 text-decoration-none me-auto"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default NavComponent;
