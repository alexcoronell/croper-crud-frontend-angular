import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthStore } from '@core/auth/auth.store';

/**
 * Shell layout for the administrative area of the application.
 * Includes a sidebar and main content area managed by RouterOutlet.
 */
@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayout {
  /** Injected AuthStore for managing global authentication and session state. */
  public authStore = inject(AuthStore);

  /** Signal representing the current visibility state of the sidebar. */
  isSidebarOpen = signal(true);

  /**
   * Toggles the sidebar visibility state.
   */
  toggleSidebar(): void {
    this.isSidebarOpen.update((v: boolean) => !v);
  }
}
