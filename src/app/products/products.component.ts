import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import * as uuid from 'uuid';

import { Product } from '../models/product';
import { addProduct, loadProducts, selectAllProducts } from '../services/products';
import { ThunkService } from '../services/thunk.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$ = this.store.select(selectAllProducts);
  loadSub$: SubscriptionLike;
  addSub$: SubscriptionLike;

  constructor(private store: Store, private dispatcher: ThunkService) { }

  ngOnInit(): void {
    this.loadSub$ = this.dispatcher.dispatch(loadProducts());
  }

  onProductAdded(product: Product) {
    this.addSub$ = this.dispatcher.dispatch(addProduct({id: uuid.v4(), ...product}));
  }

  ngOnDestroy() {
    this.loadSub$.unsubscribe();
    this.addSub$.unsubscribe();
  }
}
