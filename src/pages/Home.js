import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
} from "react-icons/ai";
import { MdReadMore } from "react-icons/md";
import { AuthContext } from "../helpers/AuthContext";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [listofLikes, setListOfLikes] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();
  // This useEffect here is render before authSate get the updated value from the localStorage. meaning, at the very beginning, it would go to the default initial state, hence, when reload, by default, it wuld send us to login page
  useEffect(() => {
    //if not login, send use to login page
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      // if logged in, fetch allPost and all likes belong to the current user
      const getAllPosts = async () => {
        const response = await axios.get(
          "https://react-mysql-blog-app.herokuapp.com/posts",
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );

        //Construcct list of all posts
        setListOfPosts(response.data.listOfPosts);

        //Construct list of likes for the current user
        const extractedLikesProperty = response.data.listofLikes.map(
          (likeObj) => likeObj.PostId
        );
        setListOfLikes(extractedLikesProperty);
        // console.log(extractedLikesProperty);
      };

      getAllPosts();
    }
  }, []);

  const handleLike = async (id) => {
    const response = await axios.post(
      "https://react-mysql-blog-app.herokuapp.com/like",
      { PostId: id },
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    );
    //alter list of post without fetching from the backend again
    setListOfPosts(
      listOfPosts.map((post) => {
        if (post.id === id) {
          if (response.data.status) {
            return { ...post, Likes: [...post.Likes, 0] }; //adding one new item to Likes array to increase it's length by 1.
          } else {
            const updatedLikesArray = post.Likes;
            updatedLikesArray.pop(); // remove the last item from Likes array to shorten it's length by 1
            return { ...post, Likes: updatedLikesArray };
          }
        } else {
          return post;
        }
      })
    ); // end of setList of Posts

    //alter list of likes without fetching from the backend again
    if (listofLikes.includes(id)) {
      setListOfLikes(listofLikes.filter((likedPostId) => likedPostId !== id));
    } else {
      setListOfLikes([...listofLikes, id]);
    }
  };

  // const viewProfile = async (id) => {
  //   const response = await axios.get(`http://localhost:3001/posts/byuserId/${id}`)
  //   const listOfPostsByUser = response.data;

  // }

  return (
    <Container className="my-5 pb-5">
      <Row xs={1} md={2} lg={3} className="g-4">
        {listOfPosts.map((post, index) => {
          return (
            <Col key={index}>
              <Card className="bg-sub">
                <Card.Header className="d-flex flex-row justify-content-between align-items-baseline title letter-spacing-1">
                  <Card.Title>{post.title}</Card.Title>
                  <div>
                    <MdReadMore
                      className="fs-5 icon-color-main"
                      onClick={() => navigate(`/post/${post.id}`)}
                    />
                  </div>
                </Card.Header>
                <Card.Body className="bg-light">
                  <Card.Text>{post.postText}</Card.Text>
                </Card.Body>
                <Card.Footer className="fst-italic d-flex flex-row justify-content-between align-items-baseline">
                  <div>
                    <Link
                      to={`/profile/${post.UserId}`}
                      className="footer-main"
                    >
                      by: {post.userName}
                    </Link>
                  </div>
                  <div>{post.Likes.length} Likes</div>

                  <div
                    className="icon-color-main"
                    onClick={(e) => handleLike(post.id)}
                  >
                    {listofLikes.includes(post.id) ? (
                      <AiFillDislike />
                    ) : (
                      <AiFillLike />
                    )}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Home;
