import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProductStore } from '@core/store/product.store';
import { RouterLink } from '@angular/router';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  readonly productStore = inject(ProductStore);

  showDeleteModal = signal(false);
  productToDelete = signal<Product | null>(null);
  isDeleting = signal(false);

  openDeleteModal(product: Product) {
    this.productToDelete.set(product);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.productToDelete.set(null);
  }

  async confirmDelete() {
    const product = this.productToDelete();
    if (!product?._id) return;

    this.isDeleting.set(true);
    try {
      await this.productStore.deleteProduct(product._id);
      this.closeDeleteModal();
    } catch (error) {
      console.error('Error al eliminar:', error);
    } finally {
      this.isDeleting.set(false);
    }
  }
}
