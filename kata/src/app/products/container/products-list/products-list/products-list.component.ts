import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product.service';

@Component({
  selector: 'app-products-list',
  template: `<p></p>`,
})
export class ProductsListComponent {
  private readonly productServices = inject(ProductService);
  public products$!: Observable<Product[]>;

  ngOnInit() {
    this.products$ = this.productServices.getProducts();
    console.log(this.products$);
  }
}
