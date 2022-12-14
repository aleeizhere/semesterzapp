import { Grid, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backendUri } from "../constants";
import { proposalActions } from "../store/proposalSlice";
import ProgressGif from "./ProgressGif.gif";

const EngagedPosts = ({ changed }) => {
  const dispatch = useDispatch();
  const engagedPosts = useSelector((state) => state.post.selectedPost);
  const currentUser = useSelector((state) => state.user);
  const proposals = useSelector((state) => state.proposals.proposals);
  useEffect(() => {
    async function bringSubmittedProposals(username) {
      const proposalsResp = await axios.get(
        `${backendUri}/proposal/submittedproposals/${username}`
      );
      dispatch(proposalActions.setProposal(proposalsResp.data));
    }
    bringSubmittedProposals(currentUser.username);
  }, [changed]);

  return !engagedPosts || !proposals ? (
    <div className="flex justify-center absolute left-1/2 -translate-x-1/2 ">
      <img src={ProgressGif} alt="" className="w-3/5 opacity-60" />
    </div>
  ) : !engagedPosts.length > 0 ? (
    <div className="text-center">No Proposal Made Yet </div>
  ) : (
    engagedPosts.map((post) => {
      const postProposal = proposals.find(
        (proposal) => proposal.postId === post._id.toString()
      );
      // console.log(postProposal);
      if (postProposal.status === "accepted") {
        return (
          <div>
            <div className="flex border-1 border-gray-300 flex-col justify-center bg-green-200 rounded-lg p-4">
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
            </div>
          </div>
        );
      } else if (postProposal.status === "rejected") {
        return (
          <div>
            <div className="flex border-1 border-gray-300 flex-col justify-center bg-red-400 rounded-lg p-4">
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
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="flex border-1 border-gray-300 flex-col justify-center bg-blue-200 rounded-lg p-4">
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
            </div>
          </div>
        );
      }
    })
  );
};
export default EngagedPosts;
