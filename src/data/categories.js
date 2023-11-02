import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "react-dotenv";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'categories',
    }),
    getCategory: builder.query({
      query: id => ({
        url: `category/${id}`,
        method: 'GET'
      })
    }),
    getSubcategoriesByCategory: builder.query({
      query: param => ({
        url: `category/${param}`,
        method: 'GET'
      })
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery, useGetSubcategoriesByCategoryQuery } = categoriesApi;