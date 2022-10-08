import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Post = ({ handleOpen, setProposalData, proposalData, idlePosts }) => {
  
  return !idlePosts ? (
    <CircularProgress></CircularProgress>
  ) : !idlePosts.length ? (
    <h4>No Posts Avaialable</h4>
  ) : (
    idlePosts.map((post) => (
      <Grid item key={post._id}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#b3e5fc",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
          <Typography variant="p" fontSize={15} textAlign="center">
            {post.fullname}
          </Typography>
          <Typography
            variant="p"
            fontSize={13}
            textAlign="center"
            sx={{ opacity: "0.6" }}
          >
            {post.creator}
          </Typography>
          <Typography
            variant="h5"
            fontSize={20}
            textAlign="center"
            mt={3}
            mb={3}
          >
            {post.subject}
          </Typography>
          <Button
            onClick={() => {
              handleOpen();
              setProposalData({ ...proposalData, postId: post._id });
              // console.log(proposalData);
            }}
            variant="contained"
            sx={{ backgroundColor: "#303f9f", color: "white" }}
          >
            Submit a Proposal
          </Button>
        </div>
      </Grid>
    ))
  );
};

export default Post;
