import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { fetchPosts } from "../store/postActions";
import { postActions } from "../store/postSlice";
import { userActions } from "../store/userSlice";
import axios from "axios";
import Posts from "./Posts";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { backendUri } from "../constants";
import { Modal } from "@mui/material";
import Form from "./Form";

const Student = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const postData = useSelector((state) => state.post.posts);
  const [changed, setChanged] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userData.role === "student") {
      const getPostData = async () => {
        const apiResult = await axios.get(
          `${backendUri}/posts/getposts/${userData.username}`
        );

        dispatch(postActions.setPosts(apiResult.data));
      };

      getPostData(); //of the logged in user
    } else if (!userData.role) {
      navigate("/");
    } else {
      navigate("/problempage");
    }
  }, [changed]);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between w-full bg-slate-600 h-8 px-8 ">
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
      <Box>
        <div className=" mx-4 flex items-center justify-between ">
          <div className=" my-9">
            <h2 className=" text-gray-400 font-thin">Welcome,</h2>
            <h2 className="text-2xl text-gray-900 font-normal">
              {userData.fullname}
            </h2>
          </div>
          <div
            className="bg-orange-300 h-fit rounded-full text-white lg:hidden"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddRoundedIcon sx={{ fontSize: "40px" }} />
          </div>
        </div>
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="outline-none w-full px-3 absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
            <Form
              currentUser={userData}
              setChanged={setChanged}
              changed={changed}
            />
          </div>
        </Modal>
        <div className="px-4 lg:hidden">
          <div style={{ display: "flex", flexDirection: "column-reverse" }}>
            <Posts
              currentUser={userData.username}
              postsArray={postData}
              setChanged={setChanged}
              changed={changed}
            />
          </div>
        </div>

        {/* For large Screens */}
        <div className="lg:grid grid-cols-3 gap-10 hidden px-4">
          <div className="px-4 col-span-2 ">
            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
              <Posts
                currentUser={userData.username}
                postsArray={postData}
                setChanged={setChanged}
                changed={changed}
              />
            </div>
          </div>
          <div className="outline-none  px-3">
            <Form
              currentUser={userData}
              setChanged={setChanged}
              changed={changed}
            />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Student;
