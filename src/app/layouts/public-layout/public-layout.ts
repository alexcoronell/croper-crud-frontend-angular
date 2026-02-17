import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from 'src/app/shared/components/header/header';
import { Footer } from 'src/app/shared/components/footer/footer';

@Component({
  selector: 'app-public-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout {}
