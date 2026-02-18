import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthStore } from '@core/auth/auth.store';

/**
 * Global navigation header component.
 * Provides navigation links and authentication-related actions like logout.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  /** Injected AuthStore for accessing user authentication state. */
  readonly authStore = inject(AuthStore);

  /**
   * Triggers the logout process via AuthStore.
   */
  logout(): void {
    this.authStore.logout();
  }
}
