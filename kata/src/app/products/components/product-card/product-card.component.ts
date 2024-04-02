import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from 'src/app/cart/service/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, CurrencyPipe, MatButtonModule],
  template: `
    <mat-card
      class="product-card p-3 cursor-pointer hover:scale-110 hover:z-10 transition-transform duration-200"
      (click)="showProductDetails(product)"
    >
      <mat-card-header>
        <mat-card-title>{{ product.title }}</mat-card-title>
        <mat-card-subtitle>{{ product.category }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <img
          mat-card-image
          [src]="product.image"
          class="object-cover h-48 rounded-lg"
        />
        <span>
          {{ product.price | currency }}
        </span>
      </mat-card-content>
      <mat-divider></mat-divider>
      <mat-card-actions>
        <button
          mat-button
          class="add-btn w-full py-2 rounded-lg"
          (click)="addToCart($event, product)"
        >
          Add to cart
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .product-card {
        background-color: #f4bf96;
      }
      .add-btn {
        background-color: #ce5a67;
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  private readonly matDialog = inject(MatDialog);
  private readonly cartService = inject(CartService);

  showProductDetails(product: Product) {
    this.matDialog.open(ProductDetailsComponent, { data: product });
  }
  addToCart(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.cartService.addTocart(product);
  }
}
