import { Injectable, inject } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Product, ProductsResponse } from '@app/domain/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiBase: string = environment.apiUrl;

  private readonly apiUrl: string = `${this.apiBase}/product`;

  getAll = (params: () => { page: number; limit: number }) => {
    const resource = httpResource<ProductsResponse>(() => ({
      url: this.apiUrl,
      params: params(),
    }));
    return resource;
  };

  create = (product: Partial<Product>) => this.http.post<Product>(this.apiUrl, product);

  update = (id: string, product: Partial<Product>) =>
    this.http.patch<Product>(`${this.apiUrl}/${id}`, product);
}
