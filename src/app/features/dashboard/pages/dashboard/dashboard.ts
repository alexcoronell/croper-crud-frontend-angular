import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ProductStore } from '@core/store/product.store';
import { UserStore } from '@core/store/user.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  // Inyectamos los stores para obtener los totales
  readonly productStore = inject(ProductStore);
  readonly userStore = inject(UserStore);
}
