import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private productService = inject(ProductService);

  readonly page = signal(1);
  readonly limit = signal(10);

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
}
