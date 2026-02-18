import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductHomeCard } from '../product-home-card/product-home-card';
import { ProductStore } from '@store/product.store';

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
  readonly productStore = inject(ProductStore);

  handleNext() {
    this.productStore.nextPage();
    this.scrollToTop();
  }

  handlePrev() {
    this.productStore.prevPage();
    this.scrollToTop();
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
