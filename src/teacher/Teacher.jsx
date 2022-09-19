import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../store/postSlice";
import EngagedPosts from "./EngagedPosts";

const Teacher = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentUser = useSelector((state) => state.user);
  const idlePosts = useSelector((state) => state.post.posts);
  const engagedPosts = useSelector((state) => state.post.selectedPost);
  const [proposalData, setProposalData] = useState({
    postId: "",
    teacherUsername: currentUser.username,
    fullname: currentUser.fullname,
    price: "",
    status: "pending",
  });

  useEffect(() => {
    async function getPosts() {
      const idlePosts = await axios.get(
        "http://localhost:3333/posts/getidleposts"
      );
      const engagedPosts = await axios.get(
        `http://localhost:3333/posts/getengagedposts/${currentUser.username}`
      );
      const engagedPostsArray = engagedPosts.data;
      let idlePostsArray = idlePosts.data;

      //remove engaged posts from the idlePostsArray
      //run a loop over engagedPostsArray and pick id of each element one by one
      //check whether that id is in the idlePost  Array or not if yes then pop it

      console.log("Engaged Posts", engagedPostsArray);
      console.log("Idle Posts", idlePostsArray);

      // engagedPostsArray.forEach((engagedPost) => {
      //   let filteredArray = idlePostsArray.filter((idlePost) => {
      //     return idlePost._id !== engagedPost._id;
      //   });
      //   console.log(filteredArray);
      // });

      engagedPostsArray.forEach((engagedPost) => {
        let filteredArray = idlePostsArray.filter((idlePost) => {
          return idlePost._id !== engagedPost._id;
        });
        idlePostsArray = filteredArray;
      });

      // engagedPostsArray.forEach((item)=>{

      // })

      dispatch(postActions.setSelectedPost(engagedPostsArray));
      dispatch(postActions.setPosts(idlePostsArray));
    }
    getPosts();
  }, [dispatch]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem 2rem",
        }}
      >
        <Typography variant="h5" component="span" color="#a1887f" mb={3}>
          Welcome,{" "}
          <span style={{ color: "#212121" }}>{currentUser.fullname}</span>
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
      <Grid
        container
        columnSpacing={4}
        rowSpacing={2}
        width="90%"
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        mt="2rem"
        m="4rem 5rem"
        p="2rem 1rem"
      >
        <Post
          handleOpen={handleOpen}
          setProposalData={setProposalData}
          proposalData={proposalData}
          idlePosts={idlePosts}
        />
      </Grid>
      <Typography variant="h5" m="0 5rem" sx={{ opacity: "0.7" }}>
        Engaged Posts
      </Typography>
      <Grid
        container
        columnSpacing={4}
        rowSpacing={2}
        width="90%"
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        m="1rem 5rem"
        p="2rem 1rem"
      >
        <EngagedPosts engagedPosts={engagedPosts} />
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Form proposalData={proposalData} setProposalData={setProposalData} />
        </Box>
      </Modal>
    </>
  );
};

export default Teacher;
