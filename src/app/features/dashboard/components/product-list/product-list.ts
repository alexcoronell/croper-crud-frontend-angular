import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductStore } from '@core/store/product.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  readonly productStore = inject(ProductStore);
}
