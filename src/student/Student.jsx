import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { fetchPosts } from "../store/postActions";
import { postActions } from "../store/postSlice";

import axios from "axios";
import Form from "./Form";
import Posts from "./Posts";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user);
  const postData = useSelector((state) => state.post.posts);

  useEffect(() => {
    const getPostData = async () => {
      const apiResult = await axios.get(
        `http://localhost:3333/posts/getposts/${userData.username}`
      );

      dispatch(postActions.setPosts(apiResult.data));
    };

    getPostData(); //of the logged in user
  }, []);

  return (
    <>
      <Box>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component="span" color="#a1887f" mb={3}>
            Welcome,{" "}
            <span style={{ color: "#212121" }}>{userData.fullname}</span>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              sessionStorage.clear();
              window.location.replace("/");
            }}
          >
            Logout
          </Button>
        </div>
        <div>
          <Typography variant="h6">Posts goes here</Typography>
          <Posts currentUser={userData.username} postsArray={postData} />
        </div>
        <Form currentUser={userData.username} />
      </Box>
    </>
  );
};

export default Student;
