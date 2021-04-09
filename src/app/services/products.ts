import { InjectionToken } from '@angular/core';
import { ActionReducer, StoreConfig } from '@ngrx/store';
import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query';
import { Product } from '../models/product';
import { ThunkService } from './thunk.service';

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

export const PRODUCTS_FEATURE_CONFIG_TOKEN = new InjectionToken<StoreConfig<any>>('Products Feature Config');

/**
 * Middleware/Meta-reducer factory
 */
export function productsMiddleware(dispatcher: ThunkService) {
  return function(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {
      const next = productsApi.middleware(dispatcher.middlewareApi());
      const nextState = next(action => reducer(state, action));
      
      return nextState(action);
    };
  }
}

/**
 * Factory function to register meta-reducer with Dependency Injection
 */
export function getProductsFeatureConfig(thunkService: ThunkService): StoreConfig<any> {
  return { 
    metaReducers: [productsMiddleware(thunkService)]
  };
}

/**
 * Provider function for feature config
 */
export function provideProductsFeatureConfig() {
  return [
    {
      provide: PRODUCTS_FEATURE_CONFIG_TOKEN,
      deps: [ThunkService],
      useFactory: getProductsFeatureConfig,
    }
  ];
}

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
