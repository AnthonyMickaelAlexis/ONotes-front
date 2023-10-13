import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth';
import articleReducer from '../article';
import { authApi } from "../../data/auth";
import userProfileReducer from "../user";
import { userProfileApi } from "../../data/user";
import { carouselArticlesApi } from "../../data/articles";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [carouselArticlesApi.reducerPath]: carouselArticlesApi.reducer,
    article: articleReducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    userProfile: userProfileReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware, carouselArticlesApi.middleware, userProfileApi.middleware)
});

export default store;
