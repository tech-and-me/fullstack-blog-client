import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../helpers/AuthContext";

const Logout = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = (e) => {
    const val = e.target.innerText;
    if (val == "Cancel") {
      navigate(-1);
    } else {
      localStorage.clear();
      setAuthState({ ...authState, Id: 0, userName: "", status: false });
      navigate("/");
    }
  };

  return (
    <Container className="my-5 py-5 px-5 mx-auto text-center border border-3">
      <h4 className="mx-auto text-center">Are you sure you want to logout?</h4>
      <div className="mt-3">
        <Button style={{ width: "5rem" }} onClick={(e) => handleLogOut(e)}>
          Yes
        </Button>
        {"              "}
        <Button style={{ width: "5rem" }} onClick={(e) => handleLogOut(e)}>
          Cancel
        </Button>
      </div>
    </Container>
  );
};

export default Logout;
