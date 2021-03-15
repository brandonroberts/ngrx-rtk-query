import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as uuid from 'uuid';

import { Product } from '../models/product';
import { addProduct, loadProducts, selectAllProducts } from '../services/products';
import { ThunkService } from '../services/thunk.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$ = this.store.select(selectAllProducts);

  constructor(private store: Store, private dispatcher: ThunkService) { }

  ngOnInit(): void {
    this.dispatcher.dispatch(loadProducts());
  }

  onProductAdded(product: Product) {
    this.dispatcher.dispatch(addProduct({id: uuid.v4(), ...product}));
  }
}
