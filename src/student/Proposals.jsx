import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postActions } from "../store/postSlice";
import { fetchProposals } from "../store/proposalActions";
import { backendUri } from "../constants";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";

const Proposals = () => {
  const selectedPostId = useSelector((state) => state.post.selectedPost);
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  const proposals = useSelector((state) => state.proposals.proposals);
  const [dataChanged, setDataChanged] = useState(false);
  const [currPost, setCurrPost] = useState("");
  const navigate = useNavigate();
  //this postId data should be dispatched and the state must be updated with the array of proposal objects
  useEffect(() => {
    //yahan selectedPostId state main se hat rahi hai tabhi proposals fetch nhi horahay
    // i want this to dispatch action only once
    const currPost = posts.filter((i) => i._id === selectedPostId);
    setCurrPost(currPost[0]);

    dispatch(fetchProposals(selectedPostId));
  }, [dataChanged]);

  async function handleAccept(proposalId) {
    await axios.post(`${backendUri}/proposal/acceptproposal`, {
      proposalId,
    });
    setDataChanged(!dataChanged);
  }
  async function handleReject(proposalId) {
    await axios.post(`${backendUri}/proposal/rejectproposal`, {
      proposalId,
    });
    setDataChanged(!dataChanged);
  }
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between w-full  bg-slate-600 h-8 px-8 ">
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
      {!proposals ? (
        <CircularProgress></CircularProgress>
      ) : !proposals.length ? (
        <div className="flex flex-col items-center pt-24 h-screen opacity-25 px-4">
          <h4 className="text-3xl mb-3">No Proposals</h4>
          <h4 className="text-xl text-center">
            As soon as any teacher send a proposal on this post they'll appear
            here.
          </h4>
        </div>
      ) : (
        <>
          <div className="px-3 lg:flex lg:flex-col lg:items-center">
            <div>
              <h3 className="text-3xl text-slate-700 py-5">Proposals</h3>
              <h3 className="opacity-50 mb-5">Subject: {currPost.subject}</h3>
            </div>
            {proposals.map((i) => (
              <div
                key={i._id}
                className="flex flex-col border-1 border-gray-200 items-center px-4 mb-4 py-5 bg-gradient-to-tr from-slate-100 to-gray-100 rounded-md lg:w-4/5"
              >
                <div className="flex w-full justify-around  ">
                  <div className="w-1/3 border-r-1 border-r-gray-300">
                    <h6 className="opacity-60">Username</h6>
                    <div className="text-2xl">{i.teacherUsername}</div>
                  </div>
                  <div className="w-1/3 text-center border-r-1 border-r-gray-300">
                    <h6 className="opacity-60">Name</h6>
                    <div className="text-2xl">{i.fullname}</div>
                  </div>
                  <div className="w-1/3 text-right">
                    <h6 className="opacity-60">Price</h6>
                    <div className="text-2xl">{i.price}</div>
                  </div>
                </div>
                <div className="flex justify-around mt-10">
                  <div className="w-32 flex justify-center">
                    <button
                      className="outline-none bg-gradient-to-tr from-slate-500 to-gray-900 text-slate-50 px-5 py-1 rounded-full active:px-6 transition-all"
                      onClick={() => {
                        handleAccept(i._id);
                      }}
                    >
                      Accept
                    </button>
                  </div>
                  <div className="w-32 flex justify-center">
                    <button
                      className="outline-none bg-gradient-to-tr from-slate-500 to-gray-900 text-slate-50 px-5 py-1 rounded-full active:px-6 transition-all"
                      onClick={() => {
                        handleReject(i._id);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Proposals;
