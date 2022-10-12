import { Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../store/postSlice";
import EngagedPosts from "./EngagedPosts";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { backendUri } from "../constants";
const Teacher = () => {
  const [changed, setChanged] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentUser = useSelector((state) => state.user);
  const idlePosts = useSelector((state) => state.post.posts);
  const [proposalData, setProposalData] = useState({
    postId: "",
    teacherUsername: currentUser.username,
    fullname: currentUser.fullname,
    price: "",
    status: "pending",
  });

  useEffect(() => {
    if (currentUser.role === "teacher") {
      async function getPosts() {
        const idlePosts = await axios.get(`${backendUri}/posts/getidleposts`);
        const engagedPosts = await axios.get(
          `${backendUri}/posts/getengagedposts/${currentUser.username}`
        );
        const engagedPostsArray = engagedPosts.data;
        let idlePostsArray = idlePosts.data;
        /*
          console.log("engaged Posts", engagedPostsArray);
          console.log("idle Posts", idlePostsArray);
        */

        //remove engaged posts from the idlePostsArray
        //run a loop over engagedPostsArray and pick id of each element one by one
        //check whether that id is in the idlePost  Array or not if yes then pop it

        // console.log("Engaged Posts", engagedPostsArray);
        // console.log("Idle Posts", idlePostsArray);

        engagedPostsArray.forEach((engagedPost) => {
          let filteredArray = idlePostsArray.filter((idlePost) => {
            return idlePost._id !== engagedPost._id;
          });
          idlePostsArray = filteredArray;
        });

        dispatch(postActions.setSelectedPost(engagedPostsArray));
        dispatch(postActions.setPosts(idlePostsArray));
      }
      getPosts();
    } else if (!currentUser.role) {
      navigate("/");
    } else {
      navigate("/problempage");
    }
  }, [changed]);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between w-full bg-slate-600 h-8 px-8 mb-2">
        <div className="font-logo font-semibold text-lg text-white">
          Semester
          <span className="text-orange-400 font-logo font-semibold">z</span>
        </div>
        <div className="flex justify-center w-24">
          <button
            className="border-1 border-slate-100 text-slate-100 hover:bg-slate-100 hover:text-slate-900 px-4 rounded-full active:px-3 transition-all"
            onClick={() => {
              dispatch(userActions.removeCurrentUser());
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className=" mx-4 flex items-center justify-between ">
        <div className=" my-9">
          <h2 className=" text-gray-400 font-thin">Welcome,</h2>
          <h2 className="text-2xl text-gray-900 font-normal">
            {currentUser.fullname}
          </h2>
        </div>
      </div>

      <Post
        handleOpen={handleOpen}
        setProposalData={setProposalData}
        proposalData={proposalData}
        idlePosts={idlePosts}
      />
      <div className="flex items-center flex-col mt-4">
        <h1 className="text text-2xl text-gray-500 mb-8">Engaged Posts</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 w-3/4 px-3 gap-8">
          <EngagedPosts changed={changed} />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="outline-none w-full px-3 absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 lg:w-2/4">
          <Form
            setOpen={setOpen}
            setChanged={setChanged}
            changed={changed}
            proposalData={proposalData}
            setProposalData={setProposalData}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Teacher;
