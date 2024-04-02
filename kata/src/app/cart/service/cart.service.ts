import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from 'src/app/products/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>(this.getCart());
  private cartItems$ = this.cartSubject.asObservable();
  private totalItem$ = this.cartItems$.pipe(
    map((items) => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  constructor() {}
  private getCart(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  private saveCart(items: CartItem[]): void {
    this.cartSubject.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }

  addTocart(product: Product): void {
    const items: CartItem[] = this.cartSubject.value;
    const index = items.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      items[index].quantity++;
    } else {
      items.push({ product, quantity: 1 });
    }
    this.saveCart(items);
  }
  removeFromCart(productId: number): void {
    this.saveCart(
      this.cartSubject.value.filter((item) => item.product.id !== productId)
    );
  }
  quantityHandler(productId: number, quantity: number): void {
    const items = this.cartSubject.value;
    const adjustableItem = items.find((item) => item.product.id === productId);
    if (adjustableItem && quantity > 0) {
      adjustableItem.quantity = quantity;
    } else {
      this.removeFromCart(productId);
    }
    this.saveCart(items);
  }
  getTotalItem(): Observable<number> {
    return this.totalItem$;
  }
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }
}
