import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userslice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
