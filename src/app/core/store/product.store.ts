import { computed, inject, Injectable, signal } from '@angular/core';

import { Product } from '@models/product.model';
import { ProductService } from '../services/product.service';

/**
 * Store for managing product-related state and operations.
 * Handles pagination, reloading, saving, and deleting products.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private productService = inject(ProductService);

  /** Current page number for pagination. */
  readonly page = signal(1);
  /** Number of items per page. */
  readonly limit = signal(10);
  /** ID of the product currently being edited or viewed. */
  readonly currentProductId = signal<string | null>(null);

  /**
   * Resource representing the list of products fetched from the server.
   * Automatically updates when page or limit changes.
   */
  readonly resource = this.productService.getAll(() => ({
    page: this.page(),
    limit: this.limit(),
  }));

  /** List of products derived from the resource value. */
  readonly products = computed(() => this.resource.value()?.data ?? []);
  /** Total number of items available on the server. */
  readonly totalItems = computed(() => this.resource.value()?.total ?? 0);
  /** Total number of pages based on totalItems and limit. */
  readonly totalPages = computed(() => {
    const total = this.totalItems();
    return total > 0 ? Math.ceil(total / this.limit()) : 1;
  });

  /**
   * Navigates to the next page if it exists.
   */
  nextPage(): void {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
    }
  }

  /**
   * Navigates to the previous page if it exists.
   */
  prevPage(): void {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
    }
  }

  /**
   * Force reloads the product list from the server.
   */
  reloadProducts(): void {
    this.resource.reload();
  }

  /**
   * Saves a product by either creating a new one or updating an existing one.
   * @param productData - The product data to save.
   * @returns A promise that resolves when the operation is successful.
   */
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
        error: () => {
          reject(new Error('No se pudo guardar el producto'));
        },
      });
    });
  }

  /**
   * Deletes a product by its ID.
   * @param id - The ID of the product to delete.
   * @returns A promise that resolves when the operation is successful.
   */
  async deleteProduct(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.productService.delete(id).subscribe({
        next: () => {
          this.resource.reload();
          resolve();
        },
        error: () => {
          reject(new Error('No se pudo eliminar el producto'));
        },
      });
    });
  }

  /**
   * Sets the current product ID for editing or viewing.
   * @param id - The ID of the product, or null to clear the selection.
   */
  selectProduct(id?: string | null): void {
    this.currentProductId.set(id ?? null);
  }
}
