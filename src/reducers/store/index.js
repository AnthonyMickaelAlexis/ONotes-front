import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth";
import articleReducer from "../article";
import { authApi } from "../../data/auth";
import userProfileReducer from "../user";
import { userProfileApi } from "../../data/user";
import { articlesApi } from "../../data/articles";
import draftsReducer from '../drafts';
import miscReducer from '../misc';
import { categoriesApi } from "../../data/categories";
import { subcategoriesApi } from "../../data/subcategories";
import { tagsApi } from "../../data/tags";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    article: articleReducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    userProfile: userProfileReducer,
    drafts: draftsReducer,
    misc: miscReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    categories: categoriesApi.reducer,
    [subcategoriesApi.reducerPath]: subcategoriesApi.reducer,
    subcategories: subcategoriesApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    tags: tagsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      articlesApi.middleware,
      userProfileApi.middleware,
      categoriesApi.middleware,
      subcategoriesApi.middleware,
      tagsApi.middleware
    ),
});

export default store;
