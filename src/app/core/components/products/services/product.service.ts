import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetailsResponse, ProductListResponse, ProductListItem } from '../../../models/product.types';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AppConstants } from "../../../constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class ProductMainService {
  private apiUrl = AppConstants.apiUrl;
  private imagesUrl = AppConstants.imagesUrl;

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1): Observable<ProductListResponse> {
    return this.http.get<ProductListItem[]>(`${this.apiUrl}products?page=${page}`).pipe(
      map(products => {
        if (!products) {
          return {
            status: true,
            message: 'No data received',
            data: {
              products: [],
              pagination: {
                current_page: 1,
                total_pages: 1,
                total_items: 0,
                per_page: 10
              }
            }
          };
        }
        return {
          status: true,
          message: 'Products retrieved successfully',
          data: {
            products: products.map(product => ({
              ...product,
              image: product.image ? `${this.imagesUrl}/${product.image}` : product.image
            })),
            pagination: {
              current_page: page,
              total_pages: 1,
              total_items: products.length,
              per_page: 10
            }
          }
        };
      })
    );
  }

  getProductByCatId(id: number, page: number = 1): Observable<ProductListResponse> {
    return this.http.get<ProductListItem[]>(`${this.apiUrl}products/GetProductByCategory/${id}?page=${page}`).pipe(
      map(products => {
        if (!products) {
          return {
            status: true,
            message: 'No data received',
            data: {
              products: [],
              pagination: {
                current_page: 1,
                total_pages: 1,
                total_items: 0,
                per_page: 10
              }
            }
          };
        }
        return {
          status: true,
          message: 'Products retrieved successfully',
          data: {
            products: products.map(product => ({
              ...product,
              image: product.image ? `${this.imagesUrl}/${product.image}` : product.image
            })),
            pagination: {
              current_page: page,
              total_pages: 1,
              total_items: products.length,
              per_page: 10
            }
          }
        };
      })
    );
  }

  getProductById(uuid: string): Observable<ProductDetailsResponse> {
    return this.http.get<ProductDetailsResponse>(`${this.apiUrl}products/${uuid}`);
  }

  searchProducts(query: string, page: number = 1): Observable<ProductListResponse> {
    if (!query.trim()) {
      return this.http.get<ProductListItem[]>(`${this.apiUrl}products/search?page=${page}`).pipe(
        map(products => ({
          status: true,
          message: 'Products retrieved successfully',
          data: {
            products: products.map(product => ({
              ...product,
              image: product.image ? `${this.imagesUrl}/${product.image}` : product.image
            })),
            pagination: {
              current_page: page,
              total_pages: 1,
              total_items: products.length,
              per_page: 10
            }
          }
        }))
      );
    }
    return this.http.get<ProductListItem[]>(`${this.apiUrl}products/search?query=${query}&page=${page}`).pipe(
      map(products => ({
        status: true,
        message: 'Products retrieved successfully',
        data: {
          products: products.map(product => ({
            ...product,
            image: product.image ? `${this.imagesUrl}/${product.image}` : product.image
          })),
          pagination: {
            current_page: page,
            total_pages: 1,
            total_items: products.length,
            per_page: 10
          }
        }
      }))
    );
  }
}