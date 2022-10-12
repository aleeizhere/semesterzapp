import { CircularProgress } from "@mui/material";
import React from "react";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useSelector } from "react-redux";

const Post = ({ handleOpen, setProposalData, proposalData, idlePosts }) => {
  return !idlePosts ? (
    <div className="flex justify-center opacity-50">
      <CircularProgress></CircularProgress>
    </div>
  ) : !idlePosts.length ? (
    <div className="text-center opacity-50">No new Posts Avaialable</div>
  ) : (
    idlePosts.map((post) => (
      // <div key={post.id} className="border-1 border-black">
      //   <h4>{post.fullname}</h4>
      //   <h4>{post.creator}</h4>
      //   <h4>{post.subject}</h4>
      //   <button
      //     onClick={() => {
      //       handleOpen();
      //       setProposalData({ ...proposalData, postId: post._id });
      //       // console.log(proposalData);
      //     }}
      //   >
      //     Submit a Proposal
      //   </button>
      // </div>
      <>
        <div className="px-3 lg:flex lg:flex-col lg:items-center">
          <div className="flex flex-col border-1 border-gray-200 items-center px-4 mb-4 py-2 bg-gradient-to-tr from-slate-100 to-gray-100 rounded-md lg:w-4/5">
            <div className="flex w-full justify-around  ">
              <div className="w-1/3 border-r-1 border-r-gray-300">
                <h6 className="opacity-60">Username</h6>
                <div className="text-2xl">{post.creator}</div>
              </div>
              <div className="w-1/3 text-center border-r-1 border-r-gray-300">
                <h6 className="opacity-60">Name</h6>
                <div className="text-2xl h-16 overflow-hidden">
                  {post.fullname}
                </div>
              </div>
              <div className="w-1/3 text-right">
                <h6 className="opacity-60">Subject</h6>
                <div className="text-2xl">{post.subject}</div>
              </div>
            </div>
            <div className="flex justify-around mt-5">
              <button
                onClick={() => {
                  handleOpen();
                  setProposalData({ ...proposalData, postId: post._id });
                }}
                className="outline-none bg-gradient-to-tr from-slate-500 to-gray-900 text-slate-50 px-5 py-1 rounded-full active:px-6 transition-all"
              >
                <NearMeIcon className="mr-1 text-slate-300" />
                Submit a proposal
              </button>
            </div>
          </div>
        </div>
      </>
    ))
  );
};

export default Post;
