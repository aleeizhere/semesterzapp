import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    noPosts: null,
    noProposals: null,
    noAccepted: null,
    noRejected: null,
    noPending: null,
    teachers: null,
    students: null,
  },
  reducers: {
    setAdminData(state, action) {
      state.noPosts = action.payload.noPosts;
      state.noProposals = action.payload.noProposals;
      state.noAccepted = action.payload.noAccepted;
      state.noRejected = action.payload.noRejected;
      state.noPending = action.payload.noPending;
      state.teachers = action.payload.teachers;
      state.students = action.payload.students;
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice;
