import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from "react-dotenv";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: 'login',
        method: 'POST',
        body: { email, password }
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: {
          firstname: data.firstname,
          lastname: data.lastname,
          ...(data.pseudo !== '') && {pseudo: data.pseudo},
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation
        }
      }),
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation } = authApi;
