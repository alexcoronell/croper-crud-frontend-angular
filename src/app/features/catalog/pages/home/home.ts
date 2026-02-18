import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProductHomeList } from '@shared/components/product-home-list/product-home-list';

/**
 * Public home page of the application.
 * Highlights the product catalog to all visitors.
 */
@Component({
  selector: 'app-home',
  imports: [ProductHomeList],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
