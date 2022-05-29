import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import NavComponent from "./pages/NavComponent";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Footer from "./pages/Footer";

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    userName: "",
    status: false,
  });

  useEffect(() => {
    //when new page reload, we want to retrieve accessToken from localStorage and pass it to backend to reponse with error or userData. see backend codes for this routes in .routes.users
    axios
      .get(
        "https://react-mysql-blog-app.herokuapp.com/auth/retriveLocalStoragedata",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            ...authState,
            id: 0,
            userName: "",
            status: false,
          });
        } else {
          setAuthState({
            id: response.data.id,
            userName: response.data.userName,
            status: true,
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <NavComponent />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Home />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
