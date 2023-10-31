import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from "react-dotenv";


export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: env.API_URL,
}),
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => ({
        url: 'tags',
        method: 'GET'
      }),
    }),
    getTag: builder.query({
      query: (id) => ({
        url: `tag/${id}`,
        method: 'GET'
      }),
    }),
  }),
})

export const { useGetTagsQuery, useGetTagQuery } = tagsApi;
