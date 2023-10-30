import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth';
import articleReducer from '../article';
import { authApi } from "../../data/auth";
import userProfileReducer from "../user";
import { userProfileApi } from "../../data/user";
import { articlesApi } from "../../data/articles";
import { categoriesApi } from "../../data/categories";


const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    article: articleReducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    userProfile: userProfileReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    categories: categoriesApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        articlesApi.middleware,
        userProfileApi.middleware,
        categoriesApi.middleware,
        )
});

export default store;
