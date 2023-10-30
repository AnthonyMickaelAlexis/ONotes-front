import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth';
import articleReducer from '../article';
import { authApi } from "../../data/auth";
import userProfileReducer from "../user";
import { userProfileApi } from "../../data/user";
import { articlesApi } from "../../data/articles";


const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    article: articleReducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    userProfile: userProfileReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware, articlesApi.middleware, userProfileApi.middleware)
});

export default store;
