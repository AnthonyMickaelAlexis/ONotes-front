import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from "react-dotenv";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kin-onotes-back.rover.ingeeniex.com/api/' }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: 'login',
        method: 'POST',
        body: { email, password }
      }),
    }),
    signUp: builder.mutation({
      query: ({ firstname, lastname, pseudo, email, password, password_confirmation }) => ({
        url: 'register',
        method: 'POST',
        body: { firstname, lastname, pseudo, email, password, password_confirmation }
      }),
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation } = authApi;
