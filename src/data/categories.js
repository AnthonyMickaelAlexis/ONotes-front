import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "react-dotenv";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'categories',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;