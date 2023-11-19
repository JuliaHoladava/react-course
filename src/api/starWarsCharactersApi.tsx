import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CharactersResponse,
  FetchCharactersArguments,
} from '../type/interfaces';

export const starWarsCharactersApi = createApi({
  reducerPath: 'starWarsCharactersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://swapi.dev/api/`,
  }),
  endpoints: (builder) => ({
    fetchCharacters: builder.query<
      CharactersResponse,
      FetchCharactersArguments
    >({
      query: ({ searchTerm, page }) =>
        `people/?search=${searchTerm}&page=${page}`,
    }),
  }),
});

export const { useFetchCharactersQuery } = starWarsCharactersApi;
