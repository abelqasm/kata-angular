import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
  ],
  template: ` <mat-card class="p-3">
    <mat-card-header class="card-header">
      <mat-card-title>{{ cartItem.product.title }}</mat-card-title>
      <mat-card-subtitle>{{ cartItem.product.category }}</mat-card-subtitle>
      <button
        class="close-btn"
        mat-icon-button
        matTooltip="Warn"
        color="warn"
        (click)="removeItem(cartItem.product.id)"
      >
        <mat-icon>delete</mat-icon>
      </button>
    </mat-card-header>
    <mat-card-content class="card-content">
      <img
        mat-card-image
        [src]="cartItem.product.image"
        class="object-cover h-20 rounded-lg"
      />
      <div>
        <mat-card-actions>
          <span>Quantity: {{ cartItem.quantity }}</span>
          <button
            [disabled]="cartItem.quantity === 1"
            mat-icon-button
            matTooltip="Warn"
            color="warn"
            (click)="adjustQuantity(cartItem.product.id, cartItem.quantity - 1)"
          >
            <mat-icon>remove</mat-icon>
          </button>
          <button
            mat-icon-button
            matTooltip="Primary"
            color="primary"
            (click)="adjustQuantity(cartItem.product.id, cartItem.quantity + 1)"
          >
            <mat-icon>add</mat-icon>
          </button>
        </mat-card-actions>
        <span class="p-2">
          Total price:
          {{ cartItem.product.price * cartItem.quantity | currency }}
        </span>
      </div>
    </mat-card-content>
  </mat-card>`,
  styles: [
    `
      .card-content {
        display: flex;
        gap: 10px;
      }
      .card-header {
        position: relative;
      }
      .close-btn {
        position: absolute;
        top: 100%;
        right: 0;
      }
    `,
  ],
})
export class CartItemComponent {
  @Input({ required: true }) cartItem!: CartItem;
  private readonly cartService = inject(CartService);

  adjustQuantity(productId: number, quantity: number) {
    this.cartService.quantityHandler(productId, quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
