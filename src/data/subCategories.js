import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "react-dotenv";

export const subCategoriesApi = createApi({
  reducerPath: "subCategoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      query: () => 'subcategories',
    }),
  }),
});

export const { useGetSubCategoriesQuery } = subCategoriesApi;