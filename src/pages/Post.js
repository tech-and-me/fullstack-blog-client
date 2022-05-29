import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import dateFormatter from "./../utils/dateFormatter";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AuthContext } from "./../helpers/AuthContext";

const Post = () => {
  //id here represent postId where we set it as param in route define in routes/server/post (under find post by id method)
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        `https://react-mysql-blog-app.herokuapp.com/posts/${id}`
      );
      setPostObject(response.data);
    };

    const fetchComments = async () => {
      const response = await axios.get(
        `https://react-mysql-blog-app.herokuapp.com/comments/${id}`
      );
      setCommentList(response.data);
    };

    fetchPost();
    fetchComments();
  }, []);

  const addComment = async () => {
    //construct body to sent to backend via axios.post
    const newCommentObj = {
      commentBody: newComment,
      PostId: id,
    };

    //construct header to sent to backend via axios.post
    //headers need to spell in plural.  headers is an object that can contain many properties. In this case, we want out header to contain only one property which is called "accessToken"
    let newCommentHeader = {
      headers: { accessToken: localStorage.getItem("accessToken") },
    };

    //send data to backend (body as well as headers) and receive response back from backend
    //the first object, by default it is treated as Body, Hence, when we construct the body object
    //the second object can be any other things but in this case , it is the headers.
    const response = await axios.post(
      "https://react-mysql-blog-app.herokuapp.com/comments/create",
      newCommentObj,
      newCommentHeader
    );

    //if response receive from backend contain error, alert user
    if (response.data.error) {
      console.log(response.data.error);
      const name = response.data.error.name;
      alert(
        name === "JsonWebTokenError"
          ? "Sign in is required to post any comments."
          : name
      );
    }
    //if response received from backend contain NO EERROR, update state so that react will render ui again to reflex the updated state
    else {
      newCommentObj["userName"] = response.data.userName;
      setCommentList([...commentList, newCommentObj]);
      console.log("new comment added successfully!");
      setNewComment("");
    }
  };

  const deleteComment = async (id) => {
    const response = await axios.delete(
      `https://react-mysql-blog-app.herokuapp.com/comments/${id}`,
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    );
    setCommentList(commentList.filter((comment) => comment.id !== id));
  };

  const deletePost = async (id) => {
    const response = await axios.delete(
      `https://react-mysql-blog-app.herokuapp.com/posts/${id}`,
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    );
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card className="bg-secondary">
            <Card.Header>
              <Card.Title>{postObject.title}</Card.Title>
            </Card.Header>
            <Card.Body className="bg-light text-dark">
              <Card.Text>{postObject.postText}</Card.Text>
            </Card.Body>
            <Card.Footer className="fst-italic d-flex flex-row justify-content-between">
              <div>by: {postObject.userName}</div>
              <div>
                {authState.userName === postObject.userName && (
                  <FaTimesCircle
                    className="text-danger"
                    onClick={() => deletePost(postObject.id)}
                  />
                )}
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <h5>Comments</h5>
          <hr />

          <Container>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  name="postText"
                  placeholder="Write your comment here"
                  type="text"
                  rows={2}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </Col>
              <Col md={2} className="my-auto">
                <Button variant="secondary" onClick={() => addComment()}>
                  Add
                </Button>
              </Col>
            </Row>

            {commentList.map((comment, index) => (
              <Card Body className="px-2 py-2 my-2" key={index}>
                <Row>
                  <Col>{comment.commentBody}</Col>
                </Row>
                {/* <hr></hr> */}
                <Row className="mt-2">
                  <div
                    style={{ fontSize: "12px", color: "blue" }}
                    className="fst-italic d-flex flex-row justify-content-between align-items-baseline"
                  >
                    <span className="fst-bold pt-3 fw-light me-auto">
                      By: {comment.userName}
                    </span>
                    <span
                      className="fst-italic pt-3 fw-light px-5"
                      style={{ fontSize: "10px" }}
                    >
                      Dated : {dateFormatter(comment.createdAt)}
                    </span>

                    {authState.userName === comment.userName && (
                      <span
                        className="ms-5 right-0 text-danger text-light rounded-circle bg-danger"
                        style={{
                          fontSize: "10px",
                          paddingBottom: "2px",
                          paddingRight: "5px",
                          paddingLeft: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteComment(comment.id)}
                      >
                        x
                      </span>
                    )}
                  </div>
                </Row>
              </Card>
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
