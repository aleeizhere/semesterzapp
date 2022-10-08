import React from "react";
import { CircularProgress, Button } from "@mui/material";
import { postActions } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const Posts = ({ postsArray, currentUser, setChanged, changed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function viewProposals(postId) {
    dispatch(postActions.setSelectedPost(postId)); //all proposals on the selectedPost
    navigate("/student/proposals"); //go to proposals
  }

  return !postsArray ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  ) : !postsArray.length ? (
    <>
      <h4 style={{ opacity: "0.5" }}>No Posts Yet</h4>
    </>
  ) : (
    postsArray.map((e) => (
      <div
        key={e._id}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: "10px",
          padding: "8px 2rem",
          backgroundColor: "#b2ebf2",
          borderRadius: "5px",
        }}
      >
        <div style={{ width: "25rem" }}>Subject: {e.subject}</div>
        <div style={{ width: "25rem" }}>Description: {e.description}</div>
        <Button
          onClick={() => viewProposals(e._id)}
          variant="container"
          sx={{ backgroundColor: "#e8eaf6" }}
          size="small"
        >
          View Proposals
        </Button>
        <Button
          onClick={async () => {
            await axios.post("http://localhost:3333/posts/deletepost", {
              postId: e._id,
            });
            setChanged(!changed);
          }}
        >
          Delete
        </Button>
      </div>
    ))
  );
};

export default Posts;
