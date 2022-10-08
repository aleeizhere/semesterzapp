import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import proposalSlice from "./proposalSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminSlice from "./adminSlice";

const persistConfig = {
  key: "root",
  storage: storage,
};

// const persistedReducerUser = persistReducer(persistConfig, userSlice.reducer);
// const persistedReducerPost = persistReducer(persistConfig, postSlice.reducer);
// const persistedReducerProposal = persistReducer(
//   persistConfig,
//   proposalSlice.reducer
// );

const reducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
  proposals: proposalSlice.reducer,
  admin: adminSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
