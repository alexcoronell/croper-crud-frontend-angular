import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product-home-card',
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './product-home-card.html',
  styleUrl: './product-home-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductHomeCard {
  product = input.required<Product>();
  priority = input<boolean>(false);
  readonly imageSeed = computed<string>(() => {
    const id = this.product()._id;
    return id.substring(id.length - 4);
  });

  readonly imageUrl = computed(() => {
    return `https://picsum.photos/seed/${this.imageSeed()}/600/400`;
  });
}
