import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    AsyncPipe,
    ProductCardComponent,
    MatSelectModule,
    MatFormFieldModule,
  ],
  template: ` <mat-form-field>
      <mat-label>Chose a category</mat-label>
      <mat-select [(value)]="category">
        <mat-option>None</mat-option>
        @for (category of (categories$ | async); track category) {
        <mat-option [value]="category"> {{ category }} </mat-option>
        }
      </mat-select>
    </mat-form-field>
    <div class="container max-w-7xl p-10">
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        @for (product of (products$ | async); track product.id) {
        <app-product-card [product]="product" />
        }
      </ul>
    </div>`,
})
export class ProductsListComponent {
  private readonly productServices = inject(ProductService);
  public category = 'None';
  public products$!: Observable<Product[]>;
  public categories$!: Observable<String[]>;

  ngOnInit() {
    this.products$ = this.productServices.getProducts();
    this.categories$ = this.productServices.getCategories();
  }
}
