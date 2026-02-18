import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Product } from '@models/product.model';

/**
 * Visual card component for displaying a product in the public catalog.
 * Features optimized image loading and formatted currency display.
 */
@Component({
  selector: 'app-product-home-card',
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './product-home-card.html',
  styleUrl: './product-home-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductHomeCard {
  /** Input signal containing the product data to display. */
  product = input.required<Product>();
  /** Input signal indicating if the image should be loaded with high priority. */
  priority = input<boolean>(false);

  /** Computed signal providing a seed string for fetching realistic placeholder images. */
  readonly imageSeed = computed<string>(() => {
    const id = this.product()._id;
    return id.substring(id.length - 4);
  });

  /** Computed signal providing the finalized URL for the product image. */
  readonly imageUrl = computed(() => {
    return `https://picsum.photos/seed/${this.imageSeed()}/600/400`;
  });
}
