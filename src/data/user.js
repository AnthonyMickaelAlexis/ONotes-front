import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from "react-dotenv";


export const userProfileApi = createApi({
  reducerPath: 'userProfileApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: env.API_URL,
}),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (param) => ({
        url: 'dashboard',
        method: 'GET',
        params: param,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + param.token
        }
      }),
    }),
  }),
})

export const { useGetUserProfileQuery } = userProfileApi;
