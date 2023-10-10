import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const carouselArticlesApi = createApi({
  reducerPath: 'carouselArticlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1/api/' }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => 'articles'
    }),

  }),
})

console.log(carouselArticlesApi);

export const { useGetArticlesQuery } = carouselArticlesApi;
