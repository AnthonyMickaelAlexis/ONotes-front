import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({ baseUrl: window.env.API_URL }),
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: (id) => `article/${id}`,
    }),
    getArticles: builder.query({
      query: () => 'articles'
    }),
  }),
});

export const { useGetArticleQuery, useGetArticlesQuery } = articleApi;
