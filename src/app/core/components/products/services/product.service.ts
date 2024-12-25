import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../shared/models/product.interface';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AppConstants } from "../../../../core/constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class ProductMainService {
  private apiUrl = AppConstants.apiUrl;
  private imagesUrl = AppConstants.imagesUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products`).pipe(
      map(products => products.map(product => ({
        ...product,
        image: `${this.imagesUrl}/${product.image}`
      })))
    );
  }

  getProductByCatId(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products/GetProductByCategory/${id}`).pipe(
      map(products => products.map(product => ({
        ...product,
        image: `${this.imagesUrl}/${product.image}`
      })))
    );
  }

  getProductById(uuid: string): Observable<any> {
    return this.http.get<Product>(`${this.apiUrl}products/${uuid}`).pipe(
      map(product => ({
        ...product,
        image: `${this.imagesUrl}/${product.image}`
      }))
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return this.http.get<Product[]>(`${this.apiUrl}products/search`);
    }
    return this.http.get<Product[]>(`${this.apiUrl}products/search?query=${query}`);
  }
}