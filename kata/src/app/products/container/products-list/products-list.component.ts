import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [AsyncPipe, ProductCardComponent],
  template: `<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    @for (product of (products$ | async); track product.id) {
    <app-product-card [product]="product" />
    }
  </ul>`,
})
export class ProductsListComponent {
  private readonly productServices = inject(ProductService);
  public products$!: Observable<Product[]>;

  ngOnInit() {
    this.products$ = this.productServices.getProducts();
  }
}
