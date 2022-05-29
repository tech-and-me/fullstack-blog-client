import React, { useEffect, useState } from "react";
import { Container, Card, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdReadMore } from "react-icons/md";

const Profile = () => {
  let { id } = useParams(id);
  const [userName, setUserName] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicInfo/${id}`).then((response) => {
      setUserName(response.data.userName);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data.listOfPostsByUser);
    });
  }, []);

  return (
    <Container className="my-3">
      <h3>Profile Summary</h3>
      <hr />
      <h5>Username : {userName}</h5>
      <Row className="d-flex flex-row flex-wrap my-5 g-4" xs={1} md={2} lg={3}>
        {listOfPosts.map((postObject, index) => {
          return (
            <div key={index}>
              <Card>
                <Card.Header className="d-flex flex-row justify-content-between align-items-baseline">
                  <Card.Title>{postObject.title}</Card.Title>
                  <div>
                    <MdReadMore
                      className="fs-5"
                      onClick={() => navigate(`/post/${postObject.id}`)}
                    />
                  </div>
                </Card.Header>
                <Card.Body className="bg-light text-dark">
                  <Card.Text>{postObject.postText}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div>{postObject.Likes.length} Likes</div>
                </Card.Footer>
              </Card>
            </div>
          );
        })}
      </Row>
    </Container>
  );
};

export default Profile;
