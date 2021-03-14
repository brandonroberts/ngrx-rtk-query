import { createSelector } from '@ngrx/store';
import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query';

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
  }),
});

export const productsSlice = {
  name: productsApi.reducerPath,
  reducer: productsApi.reducer
};

/**
 * Actions
 */
export const loadProducts = () => productsApi.endpoints.getProducts.initiate('');

/**
 * Selectors
 */
export const selectProductsState = productsApi.endpoints.getProducts.select('');
export const selectAllProducts = createSelector(
  selectProductsState,
  state => state.data || []
);
