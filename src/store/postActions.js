import axios from "axios";
import { postActions } from "./postSlice";

//this functions gets the username of the current user and sends that username to the backend and the server searches for requested user
export const fetchPosts = (username) => {
  return async (dispatch) => {
    try {
      const posts = await axios.get(
        `http://localhost:3333/posts/getposts/${username}`
      );
      dispatch(postActions.setPosts(posts.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
