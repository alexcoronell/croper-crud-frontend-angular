import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ProductStore } from '@store/product.store';
import { ProductHomeCard } from '../product-home-card/product-home-card';

/**
 * Container component that manages a list of product cards for the public view.
 * Handles pagination events and scroll management.
 */
@Component({
  selector: 'app-product-home-list',
  imports: [ProductHomeCard],
  templateUrl: './product-home-list.html',
  styleUrl: './product-home-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    ngSkipHydration: 'true',
  },
})
export class ProductHomeList {
  /** Injected ProductStore for managing the catalog state. */
  readonly productStore = inject(ProductStore);

  /**
   * Navigates to the next page of products and scrolls to top.
   */
  handleNext(): void {
    this.productStore.nextPage();
    this.scrollToTop();
  }

  /**
   * Navigates to the previous page of products and scrolls to top.
   */
  handlePrev(): void {
    this.productStore.prevPage();
    this.scrollToTop();
  }

  /**
   * Smoothly scrolls the window to the top of the viewport.
   */
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
