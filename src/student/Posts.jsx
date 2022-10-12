import React from "react";
import { CircularProgress, Button } from "@mui/material";
import { postActions } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { backendUri } from "../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import ProgressGif from "./ProgressGif.gif";

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
      <img src={ProgressGif} alt="" width="120px" className="opacity-20" />
      {/* <CircularProgress /> */}
    </div>
  ) : !postsArray.length ? (
    <div className="text-center text-2xl">
      <h4 style={{ opacity: "0.5" }}>No Posts Yet</h4>
    </div>
  ) : (
    postsArray.map((e) => (
      <div
        key={e._id}
        className="flex flex-col my-3 border-b-gray-400 border-b-1 pb-5"
      >
        <div className="flex justify-between items-center w-full mb-3">
          <div className="text-2xl font-semibold text-slate-600">
            {e.subject}
          </div>
          <div className="w-20 flex justify-between">
            <div
              className="p-1 rounded-full bg-slate-600 inline-block text-slate-100"
              onClick={async () => {
                await axios.post(`${backendUri}/posts/deletepost`, {
                  postId: e._id,
                });
                setChanged(!changed);
              }}
            >
              <DeleteIcon />
            </div>
            <div
              className="p-1 rounded-full bg-slate-600 inline-block text-slate-100"
              onClick={() => viewProposals(e._id)}
            >
              <ArticleIcon />
            </div>
          </div>
        </div>
        <div className="text-gray-500">
          <span className="font-semibold">Description: </span>
          {e.description}
        </div>
        {/* <Button
          onClick={() => viewProposals(e._id)}
          variant="container"
          sx={{ backgroundColor: "#e8eaf6" }}
          size="small"
        >
          View Proposals
        </Button>
        <Button
          onClick={async () => {
            await axios.post(`${backendUri}/posts/deletepost`, {
              postId: e._id,
            });
            setChanged(!changed);
          }}
        >
          Delete
        </Button> */}
      </div>
    ))
  );
};

export default Posts;
