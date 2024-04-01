import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [AsyncPipe],
  template: `<ul>
    @for (product of (products$ | async); track product.id) {
    <div></div>
    }
  </ul>`,
})
export class ProductsListComponent {
  private readonly productServices = inject(ProductService);
  public products$!: Observable<Product[]>;

  ngOnInit() {
    this.products$ = this.productServices.getProducts();
    console.log(this.products$);
  }
}
