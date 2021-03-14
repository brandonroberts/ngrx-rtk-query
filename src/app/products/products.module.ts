import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { productsSlice } from '../services/products';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature(productsSlice)
  ]
})
export class ProductsModule { }
