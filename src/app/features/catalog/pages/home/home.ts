import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductHomeList } from '@shared/components/product-home-list/product-home-list';

@Component({
  selector: 'app-home',
  imports: [ProductHomeList],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
