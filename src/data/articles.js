import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "react-dotenv";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: (id) => `article/${id}`,
    }),
    getArticles: builder.query({
      query: () => 'articles'
    }),
    getHomePageArticles: builder.query({
      query: () => 'articles/homepage'
    }),
  }),
});


export const { useGetArticleQuery, useGetArticlesQuery, useGetHomePageArticlesQuery } = articlesApi;