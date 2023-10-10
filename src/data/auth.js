import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1/api/' }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: 'user',
        method: 'POST',
        body: { email, password }
      }),
    }),
    signUp: builder.mutation({
      query: ({ firstName, lastName, username, email, password }) => ({
        url: 'newuser',
        method: 'POST',
        body: { firstName, lastName, username, email, password }
      }),
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation } = authApi;
