import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './product-form.component';

import { PRODUCTS_FEATURE_CONFIG_TOKEN, productsApi, provideProductsFeatureConfig } from '../services/products';


@NgModule({
  declarations: [ProductsComponent, ProductFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    StoreModule.forFeature(productsApi.reducerPath, productsApi.reducer, PRODUCTS_FEATURE_CONFIG_TOKEN)
  ],
  providers: [
    provideProductsFeatureConfig()
  ],
})
export class ProductsModule { }
