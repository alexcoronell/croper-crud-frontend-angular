import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductList } from '../../components/product-list/product-list';

@Component({
  selector: 'app-inventario',
  imports: [ProductList],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inventario {
  private readonly router = inject(Router);

  onNew() {
    void this.router.navigate(['/admin/inventario/nuevo-producto']);
  }
}
