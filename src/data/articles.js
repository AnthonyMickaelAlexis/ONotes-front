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
    sendNewArticle: builder.mutation({
      query: ({ authorId, title, subtitle, content, banner, subCategory, token }) => ({
        url: 'article',
        method: 'POST',
        body: { user_id: authorId, title, subtitle, text_content: content, banner, subcategory_id: subCategory },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
    }),
  }),
});

export const { useGetArticleQuery, useGetArticlesQuery, useSendNewArticleMutation } = articlesApi;