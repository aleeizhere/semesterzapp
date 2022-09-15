import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    fullname: null,
    username: null,
    email: null,
    role: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.fullname = action.payload.fullname;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.password;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;