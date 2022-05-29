import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { AuthContext } from "../helpers/AuthContext";

const NavComponent = () => {
  const { authState } = useContext(AuthContext);
  return (
    <Container fluid className="bg-main text-light letter-spacing-1">
      <Container>
        <div className="py-3 d-flex flex-column flex-md-row justify-content-between gap-3">
          <div>
            <Link
              to="/post"
              className="text-light text-center text-decoration-none nav-item"
            >
              Home
            </Link>
            {authState.status && (
              <Link
                to="/post/create"
                className="text-light text-decoration-none nav-item"
              >
                Create Post
              </Link>
            )}
          </div>

          {authState.userName ? (
            <div className="text-center py-2">
              <h5 className="italic letter-spacing-1">
                Hello {authState.userName} ! Welcome to our blog !
              </h5>
            </div>
          ) : (
            <div className="text-center italic letter-spacing-1">
              You are not logged in
            </div>
          )}

          <div className="text-end">
            {!authState.status ? (
              <>
                <Link
                  to="/login"
                  className="text-light text-decoration-none nav-item"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-light text-decoration-none nav-item"
                >
                  Signup
                </Link>
              </>
            ) : (
              <Link
                to="/logout"
                className="text-light text-decoration-none me-auto nav-item"
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
