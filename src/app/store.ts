import { pokemonApi } from './services/pokemon';

export const reducers = {
  [pokemonApi.reducerPath]: pokemonApi.reducer
}
