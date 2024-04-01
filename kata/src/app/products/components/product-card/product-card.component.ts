import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  template: `<span>{{ product.title }}</span>`,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
