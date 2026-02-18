import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ProductList } from '../../components/product-list/product-list';

/**
 * Page component for the inventory management view.
 * Displays the product list and provides navigation to the product creation form.
 */
@Component({
  selector: 'app-inventario',
  imports: [ProductList],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inventario {
  /** Injected Router for navigation actions. */
  private readonly router = inject(Router);

  /**
   * Navigates to the product creation form.
   */
  onNew(): void {
    void this.router.navigate(['/admin/inventario/nuevo-producto']);
  }
}
