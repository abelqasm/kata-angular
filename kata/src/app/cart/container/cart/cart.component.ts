import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartItem } from '../../models/cart.model';
import { Observable } from 'rxjs';
import { CartService } from '../../service/cart.service';
import { CartItemComponent } from '../../component/cart-item/cart-item.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CartItemComponent, AsyncPipe],
  template: `
    <article>
      <header class="cart-header">
        <h1>Your Cart</h1>
        <button
          class="closed-btn"
          mat-icon-button
          matTooltip="Warn"
          color="warn"
          (click)="onClose($event)"
        >
          <mat-icon>close</mat-icon>
        </button>
      </header>
      <ul class="grid grid-cols-1 gap-2">
        @for (cartItem of (cartItems$ | async); track $index) {
        <app-cart-item [cartItem]="cartItem" />
        }
      </ul>
      <button mat-button class="w-full bg-[#CE5A67] py-2 rounded-lg">
        Proceed to checkout
      </button>
    </article>
  `,
  styles: [
    `
      .cart-header {
        position: relative;
      }
      .closed-btn {
        position: absolute;
        top: 0;
        right: 0;
      }
    `,
  ],
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly bottomSheetRef = inject(MatBottomSheetRef<CartComponent>);
  cartItems$: Observable<CartItem[]> = this.cartService.getCartItems();

  onClose(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
