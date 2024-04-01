import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + '/products');
  }
}
