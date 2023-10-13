import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const carouselArticlesApi = createApi({
  reducerPath: 'carouselArticlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kin-onotes-back.rover.ingeeniex.com/api/' }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => 'articles'
    }),

  }),
})

console.log(carouselArticlesApi);

export const { useGetArticlesQuery } = carouselArticlesApi;
