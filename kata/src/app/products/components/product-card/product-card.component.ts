import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CartService } from 'src/app/checkout/service/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, CurrencyPipe],
  template: `
    <mat-card
      class="product-card flex gap-2 p-3 cursor-pointer hover:scale-110 hover:z-10 transition-transform duration-200"
      (click)="showProductDetails(product)"
    >
      <mat-card-header class="place-items-start">
        <mat-card-title>{{ product.title }}</mat-card-title>
        <mat-card-subtitle>{{ product.category }}</mat-card-subtitle>
      </mat-card-header>
      <img
        mat-card-image
        [src]="product.image"
        class="object-cover h-48 rounded-lg"
      />
      <mat-card-content>
        <span>
          {{ product.price | currency }}
        </span>
      </mat-card-content>
      <mat-divider></mat-divider>
      <mat-card-actions class="w-full">
        <button
          mat-button
          class="w-full bg-[#CE5A67] py-2 rounded-lg"
          (click)="addToCart($event, product)"
        >
          Add to cart
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: ['.product-card { background-color: #F4BF96; }'],
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
