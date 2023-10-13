import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth';
import articleReducer from '../article';
import { authApi } from "../../data/auth";
import { carouselArticlesApi } from "../../data/articles";
import draftsReducer from '../drafts';
import miscReducer from '../misc';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [carouselArticlesApi.reducerPath]: carouselArticlesApi.reducer,
    article: articleReducer,
    drafts: draftsReducer,
    misc: miscReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware, carouselArticlesApi.middleware)
});

export default store;
