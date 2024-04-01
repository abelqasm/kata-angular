import { Component } from '@angular/core';
import { ProductsListComponent } from 'src/app/products/container/products-list/products-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsListComponent],
  template: `<div>
    <app-products-list></app-products-list>
  </div>`,
})
export class HomeComponent {}
