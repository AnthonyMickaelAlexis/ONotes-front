import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://o-notes-api.laravel-sail.site:8080/api/' }),
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: (id) => ({ url:`article/${id}` }),
    }),
  }),
});

export const { useGetArticleQuery } = articleApi;
