import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../auth';
import { authApi } from "../../data/auth";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
