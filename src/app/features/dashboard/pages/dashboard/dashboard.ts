import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ProductStore } from '@core/store/product.store';
import { UserStore } from '@core/store/user.store';

/**
 * Main administrative dashboard page.
 * Displays high-level metrics and system overviews by consuming ProductStore and UserStore.
 */
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  /** Product store instance for providing product-related metrics. */
  readonly productStore = inject(ProductStore);
  /** User store instance for providing user-related metrics. */
  readonly userStore = inject(UserStore);
}
