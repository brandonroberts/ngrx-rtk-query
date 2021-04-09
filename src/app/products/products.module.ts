import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './product-form.component';

import { PRODUCTS_FEATURE_CONFIG_TOKEN, getProductsFeatureConfig, productsSlice } from '../services/products';
import { ThunkService } from '../services/thunk.service';


@NgModule({
  declarations: [ProductsComponent, ProductFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    StoreModule.forFeature(productsSlice.name, productsSlice.reducer, PRODUCTS_FEATURE_CONFIG_TOKEN)
  ],
  providers: [
    {
      provide: PRODUCTS_FEATURE_CONFIG_TOKEN,
      deps: [ThunkService],
      useFactory: getProductsFeatureConfig,
    },
  ],
})
export class ProductsModule { }
