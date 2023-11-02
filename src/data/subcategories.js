import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from "react-dotenv";

export const subcategoriesApi = createApi({
  reducerPath: 'subcategoriesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: env.API_URL,
}),
  endpoints: (builder) => ({
    getSubcategory: builder.query({
      query: id => ({
        url: `subcategory/${id}`,
        method: 'GET'
      })
    }),
    getSubcategories: builder.query({
      query: () => ({
        url: 'subcategories',
        method: 'GET'
      }),
    }),
  }),
})

export const { useGetSubcategoryQuery, useGetSubcategoriesQuery } = subcategoriesApi;