import axios from "axios";
import { backendUri } from "../constants";
import { proposalActions } from "./proposalSlice";

export const fetchProposals = (postId) => {
  return async (dispatch) => {
    const proposals = await axios.get(
      `${backendUri}/proposal/getpostproposals/${postId}`
    );

    dispatch(proposalActions.setProposal(proposals.data));
  };
};
