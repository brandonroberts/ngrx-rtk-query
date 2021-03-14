import { pokemonApi } from './services/pokemon';
import { productsApi } from './services/products';

export const reducers = {
  [pokemonApi.reducerPath]: pokemonApi.reducer
};
