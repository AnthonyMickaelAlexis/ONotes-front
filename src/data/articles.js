import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kin-onotes-back.rover.ingeeniex.com/api/' }),
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: (id) => `article/${id}`,
    }),
    getArticles: builder.query({
      query: () => 'articles'
    }),
  }),
});

export const { useGetArticleQuery, useGetArticlesQuery } = articlesApi;