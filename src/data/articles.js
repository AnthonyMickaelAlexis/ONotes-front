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
      query: (params) => {
        return {
          url: `articles`,
          method: 'GET',
          params: {
            page: params.page
          }
        }
      },
    }),
    getHomePageArticles: builder.query({
      query: () => 'articles?limit=20'
    }),
    sendArticle: builder.mutation({
      query: (data) => ({
        url: `article/${data.postId !== undefined ? data.postId : ''}`,
        method: data.method,
        body: {
          user_id: data.authorId,
          title: data.title,
          ...(data.subtitle !== undefined) && {subtitle: data.subtitle},
          ...(data.excerpt !== undefined) && {resume: data.excerpt},
          text_content: data.content,
          ...(data.banner !== undefined) && {banner: data.banner},
          subcategory_id: data.subCategory,
          ...(data.tags !== undefined) && {tags: data.tags},
          ...(data.newTags !== undefined) && {new_tags: data.newTags},
          status: data.status
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`
        }
      }),
    }),
  }),
});


export const { useGetArticleQuery, useGetArticlesQuery, useGetHomePageArticlesQuery, useSendArticleMutation } = articlesApi;