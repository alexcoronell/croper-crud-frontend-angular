import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from '@shared/components/footer/footer';
import { Header } from '@shared/components/header/header';

/**
 * Shell layout for the public-facing section of the application.
 * Composes the global header, main scrollable content area, and global footer.
 */
@Component({
  selector: 'app-public-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout {}
