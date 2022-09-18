import axios from "axios";
import { proposalActions } from "./proposalSlice";

export const fetchProposals = (postId) => {
  return async (dispatch) => {
    const proposals = await axios.get(
      `http://localhost:3333/proposal/getpostproposals/${postId}`
    );

    dispatch(proposalActions.setProposal(proposals.data));
  };
};
