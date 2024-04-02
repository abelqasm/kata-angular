import { Product } from 'src/app/products/models/product.model';
export interface CartItem {
  product: Product;
  quantity: number;
}