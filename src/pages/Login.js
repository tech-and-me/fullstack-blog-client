import React, { useState, useContext } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginDetail = { userName, password };
    //send loginDetail to backend to check if it is valid and then receive response from backend
    const response = await axios.post(
      "http://localhost:3001/auth/login",
      loginDetail
    );

    //if response from backend contain error, alert user
    if (response.data.error) alert(response.data.error);
    //if response from backend contain no error, store token (which is the response from backend) to localStorage
    else {
      localStorage.setItem("accessToken", response.data.token);
      setAuthState({
        Id: response.data.id,
        userName: response.data.userName,
        status: true,
      });

      // console.log(response.data);
      setUserName("");
      setPassword("");

      //send user to the latest page the user was on before singing in
      navigate("/");
    }
  };

  return (
    <Container
      className="my-5 py-5 border border-3 rounded-3"
      style={{ maxWidth: "40rem" }}
    >
      <form
        className="mx-auto"
        style={{ maxWidth: "30rem" }}
        onSubmit={handleSubmit}
      >
        <h5 className="mb-3">Please login to proceed</h5>
        <hr />
        <div>
          <label for="userName">Username:</label>
          <input
            className="form-control"
            type="text"
            value={userName}
            name="userName"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label for="password" className="mt-3">
            Password:
          </label>
          <input
            className="form-control"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="my-3" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
