import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query';
import { Product } from '../models/product';

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'products',
  entityTypes: ['Products'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string>({
      query: () => 'products',
      provides: (result) => result.map(({ id }) => ({ type: 'Products', id }))
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: `products`,
        method: 'POST',
        body,
      }),
      invalidates: ['Products']
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
export const addProduct = (product: Product) => productsApi.endpoints.addProduct.initiate(product);

/**
 * Selectors
 */
export const selectProductsState = productsApi.endpoints.getProducts.select('');
export const selectAllProducts = createSelector(
  selectProductsState,
  state => state.data || []
);
