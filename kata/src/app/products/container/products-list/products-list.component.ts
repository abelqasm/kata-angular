import { AsyncPipe } from '@angular/common';
import { Component, inject, SimpleChanges } from '@angular/core';
import { combineLatest, map, Observable, of, Subscription } from 'rxjs';
import { Product } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SkeletonCardComponent } from '../../components/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    AsyncPipe,
    ProductCardComponent,
    MatSelectModule,
    MatFormFieldModule,
    SkeletonCardComponent,
  ],
  template: `
    <mat-form-field class="w-full">
      <mat-label>Chose a category</mat-label>
      <mat-select
        [(value)]="category"
        (selectionChange)="onCategorySelected($event.value)"
      >
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
        } @empty { @for (item of items; track $index) {
        <app-skeleton-card />
        } }
      </ul>
    </div>
  `,
})
export class ProductsListComponent {
  private readonly productServices = inject(ProductService);
  public readonly items: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  private subscription$!: Subscription;
  public category: string = 'None';
  public products$!: Observable<Product[]>;
  public categories$!: Observable<string[]>;
  ngOnInit() {
    this.products$ = this.productServices.getProducts();
    this.categories$ = this.productServices.getCategories();

    this.subscription$ = combineLatest([
      this.products$,
      this.productServices.getSearchQuery(),
    ])
      .pipe(
        map(([products, searchQuery]) => {
          if (!searchQuery || searchQuery.trim() === '') {
            return products;
          }
          return products.filter(
            (product) =>
              product.title.toLowerCase().includes(searchQuery) ||
              product.category.toLocaleLowerCase().includes(searchQuery)
          );
        })
      )
      .subscribe((finalProducts) => {
        console.log(this.products$);
        if (finalProducts) {
          this.products$ = of(finalProducts);
        }
        console.log(this.products$);
      });
  }

  onCategorySelected(category: string) {
    this.products$ = this.productServices.getProductsByCategory(category);
  }
  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
