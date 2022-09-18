import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: null,
    selectedPost: null,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setSelectedPost(state, action) {
      state.selectedPost = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice;
