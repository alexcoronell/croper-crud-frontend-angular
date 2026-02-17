import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductList } from '../../components/product-list/product-list';

@Component({
  selector: 'app-inventario',
  imports: [ProductList],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inventario {}
