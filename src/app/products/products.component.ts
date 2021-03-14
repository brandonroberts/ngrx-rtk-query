import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts, selectAllProducts } from '../services/products';
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

}
