import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth';
import { authApi } from "../../data/auth";
import userProfileReducer from "../user";
import { userProfileApi } from "../../data/user";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    userProfile: userProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userProfileApi.middleware),
});

export default store;
