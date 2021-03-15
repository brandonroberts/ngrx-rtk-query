import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './product-form.component';

import { productsSlice } from '../services/products';
import { ProductsMiddlewareEffects } from '../services/products-middleware.effects';

@NgModule({
  declarations: [ProductsComponent, ProductFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    StoreModule.forFeature(productsSlice),
    EffectsModule.forFeature([ProductsMiddlewareEffects])
  ]
})
export class ProductsModule { }
