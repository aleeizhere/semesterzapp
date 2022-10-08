import axios from "axios";
import { adminActions } from "./adminSlice";

export const fetchSetAdminData = () => {
  return async (dispatch) => {
    try {
      const posts = await axios.get("http://localhost:3333/posts/getallposts");
      const proposals = await axios.get(
        "http://localhost:3333/proposal/getallproposals"
      );
      const auths = await axios.get("http://localhost:3333/auth/getallusers");

      const noPosts = posts.data.length;
      const noProposals = proposals.data.length;
      const noAccepted = posts.data.filter(
        (post) => post.status === "accepted"
      ).length;
      const noRejected = posts.data.filter(
        (post) => post.status === "rejected"
      ).length;
      const noPending = posts.data.filter(
        (post) => post.status === "pending"
      ).length;
      const students = auths.data.filter((auth) => auth.role === "student");
      const teachers = auths.data.filter((auth) => auth.role === "teacher");

      const dataObj = {
        noPosts,
        noProposals,
        noAccepted,
        noRejected,
        noPending,
        teachers,
        students,
      };
      dispatch(adminActions.setAdminData(dataObj));
    } catch (e) {
      return e;
    }
  };
};
