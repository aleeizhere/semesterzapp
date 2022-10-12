import { userActions } from "./userSlice";
import axios from "axios";
import { backendUri } from "../constants";

export const fetchUser = (username, password) => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const resp = await axios.post(`${backendUri}/auth/login`, {
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
