import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth';
import articleReducer from '../article';
import { authApi } from "../../data/auth";
import userProfileReducer from "../user";
import { userProfileApi } from "../../data/user";
import { articlesApi } from "../../data/articles";
import draftsReducer from '../drafts';
import miscReducer from '../misc';
import { categoriesApi } from "../../data/categories";
import { subCategoriesApi } from "../../data/subCategories";
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
    [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        articlesApi.middleware,
        userProfileApi.middleware,
        categoriesApi.middleware,
        subCategoriesApi.middleware,
        tagsApi.middleware,
      )
});

export default store;
