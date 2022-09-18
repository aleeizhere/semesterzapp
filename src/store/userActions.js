import { userActions } from "./userSlice";
import axios from "axios";

export const fetchUser = (username, password) => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const resp = await axios.post("http://localhost:3333/auth/login", {
        username,
        password,
      });
      return resp;
    };
    const result = await fetchHandler(username, password);
    console.log("resp=>", result);
    dispatch(userActions.setCurrentUser(result.data.user));
  };
};
