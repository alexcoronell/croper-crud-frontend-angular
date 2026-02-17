import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '@models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private productService = inject(ProductService);

  readonly page = signal(1);
  readonly limit = signal(10);
  readonly currentProductId = signal<string | null>(null);

  readonly resource = this.productService.getAll(() => ({
    page: this.page(),
    limit: this.limit(),
  }));

  readonly products = computed(() => this.resource.value()?.data ?? []);
  readonly totalItems = computed(() => this.resource.value()?.total ?? 0);
  readonly totalPages = computed(() => {
    const total = this.totalItems();
    return total > 0 ? Math.ceil(total / this.limit()) : 1;
  });

  nextPage(): void {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
    }
  }

  prevPage(): void {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
    }
  }

  reloadProducts(): void {
    this.resource.reload();
  }

  async saveProduct(productData: Partial<Product>): Promise<void> {
    const id = this.currentProductId();
    const request$ = id
      ? this.productService.update(id, productData)
      : this.productService.create(productData);

    return new Promise((resolve, reject) => {
      request$.subscribe({
        next: () => {
          this.resource.reload();
          this.currentProductId.set(null);
          resolve();
        },
        error: (err) => {
          reject(new Error(err?.error?.message ?? 'Error al procesar el producto'));
        },
      });
    });
  }

  selectProduct(id?: string | null): void {
    this.currentProductId.set(id ?? null);
  }
}
