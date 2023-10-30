import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import env from "react-dotenv";

export const subcategoriesApi = createApi({
  reducerPath: "subcategoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
  }),
  endpoints: (builder) => ({
    getSubcategories: builder.query({
      query: () => ({
        url: "subcategories",
        method: "GET",
      }),
    }),
    getSubcategory: builder.query({
      query: (id) => ({
        url: `category/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSubcategoriesQuery, useGetSubcategoryQuery } =
  subcategoriesApi;
