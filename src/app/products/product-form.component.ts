import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  template: `
    <form [formGroup]="productForm" (ngSubmit)="addProduct()">
      <div>
        Name: <input formControlName="name" type="text">
      </div>

      <div>
        Description: <input formControlName="description" type="text">
      </div>

      <div>
        Price: <input formControlName="price" type="number">
      </div>

      <button type="submit">Add Product</button>
    </form>
  `,
  styles: [
  ]
})
export class ProductFormComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(500)
  });

  @Output() submitted = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addProduct() {
    this.submitted.emit(this.productForm.value);
  }
}
