import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Product, ProductsResponse } from '@models/product.model';
import { environment } from 'src/environments/environment';

/**
 * Service for managing product data via API.
 * Provides methods for listing, creating, updating, and deleting products.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /** Injected HttpClient for API requests. */
  private http = inject(HttpClient);
  /** Base API URL from environment config. */
  private readonly apiBase: string = environment.apiUrl;
  /** Full URL for product-related API endpoints. */
  private readonly apiUrl: string = `${this.apiBase}/product`;

  /**
   * Generates an httpResource for fetching all products with pagination.
   * @param params - Function returning pagination parameters (page, limit).
   * @returns An Angular httpResource for the product list.
   */
  getAll = (params: () => { page: number; limit: number }) =>
    httpResource<ProductsResponse>(() => ({
      url: this.apiUrl,
      params: params(),
    }));

  /**
   * Creates a new product in the system.
   * @param product - The partial product data to create.
   * @returns An observable of the created product.
   */
  create = (product: Partial<Product>) => this.http.post<Product>(this.apiUrl, product);

  /**
   * Updates an existing product in the system.
   * @param id - The ID of the product to update.
   * @param product - The partial product data for the update.
   * @returns An observable of the updated product.
   */
  update = (id: string, product: Partial<Product>) =>
    this.http.patch<Product>(`${this.apiUrl}/${id}`, product);

  /**
   * Removes a product from the system.
   * @param id - The ID of the product to delete.
   * @returns An observable of the deletion result.
   */
  delete = (id: string) => this.http.delete(`${this.apiUrl}/${id}`);
}
