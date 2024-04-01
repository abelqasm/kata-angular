import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  template: `
    <mat-card class="flex gap-2 p-3">
      <mat-card-header class="place-items-start">
        <mat-card-title>{{ product.title }}</mat-card-title>
        <mat-card-subtitle>{{ product.category }}</mat-card-subtitle>
      </mat-card-header>
      <img
        mat-card-image
        [src]="product.image"
        class="object-cover h-48 rounded-"
      />
      <mat-card-content>
        <span>
          {{ '$' + product.price }}
        </span>
      </mat-card-content>
      <mat-divider></mat-divider>
      <mat-card-actions class="w-full">
        <button mat-button class="w-full bg-red-700 py-2 rounded-lg">
          Add to cart
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
