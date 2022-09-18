import { createSlice } from "@reduxjs/toolkit";

const proposalSlice = createSlice({
  name: "proposal",
  initialState: {
    proposals: null,
  },
  reducers: {
    setProposal(state, action) {
      state.proposals = action.payload;
    },
  },
});

export const proposalActions = proposalSlice.actions;
export default proposalSlice;
