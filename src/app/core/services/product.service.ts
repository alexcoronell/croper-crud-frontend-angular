import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { ProductsResponse } from '@app/domain/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiBase: string = environment.apiUrl;

  private readonly apiUrl: string = `${this.apiBase}/product`;

  getAll = (params: () => { page: number; limit: number }) =>
    httpResource<ProductsResponse>(() => ({
      url: this.apiUrl,
      params: params(),
    }));
}
