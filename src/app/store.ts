import { pokemonApi } from './services/pokemon';

// export const store = configureStore({
//   reducer: {
//     // Add the generated reducer as a specific top-level slice
    
//   },
//   // Adding the api middleware enables caching, invalidation, polling,
//   // and other useful features of `rtk-query`.
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
// });

export const reducers = {
  [pokemonApi.reducerPath]: pokemonApi.reducer
}

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);