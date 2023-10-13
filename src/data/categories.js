import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from "react-dotenv";


export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: env.API_URL,
}),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: 'categories',
        method: 'GET'
      }),
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi;
