import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Static footer component for the application.
 * Displays copyright information and the current year.
 */
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  /** Reference date used for year calculation. */
  date = new Date();
  /** Current year derived from the reference date. */
  year = this.date.getFullYear();
}
