import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth';
import { authApi } from "../../data/auth";
import draftsReducer from '../drafts';
import miscReducer from '../misc';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    drafts: draftsReducer,
    misc: miscReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
