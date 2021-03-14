import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => `pokemon/${name}`,
    }),
  }),
});

export const pokemonThunkActionCreator = (name: string) => pokemonApi.endpoints.getPokemonByName.initiate(name);
export const selectPokemon = (name: string) => pokemonApi.endpoints.getPokemonByName.select(name);
