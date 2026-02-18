import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductStore } from '@core/store/product.store';
import { Product } from '@models/product.model';

/**
 * Component that displays a list of products in a table format.
 * Includes functionality for pagination and product deletion via a confirmation modal.
 */
@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  /** Injected ProductStore for managing product state and actions. */
  readonly productStore = inject(ProductStore);

  /** Signal controlling the visibility of the delete confirmation modal. */
  showDeleteModal = signal(false);
  /** Signal holding the specific product selected for deletion. */
  productToDelete = signal<Product | null>(null);
  /** Signal representing the ongoing deletion process status. */
  isDeleting = signal(false);

  /**
   * Opens the confirmation modal for deleting a specific product.
   * @param product - The product to be deleted.
   */
  openDeleteModal(product: Product): void {
    this.productToDelete.set(product);
    this.showDeleteModal.set(true);
  }

  /**
   * Closes the delete confirmation modal and clears selection.
   */
  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.productToDelete.set(null);
  }

  /**
   * Confirms and executes the product deletion.
   * Internal logic communicates with ProductStore to remove the product from the backend.
   */
  async confirmDelete(): Promise<void> {
    const product = this.productToDelete();
    if (!product?._id) return;

    this.isDeleting.set(true);
    try {
      await this.productStore.deleteProduct(product._id);
      this.closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      this.isDeleting.set(false);
    }
  }
}
