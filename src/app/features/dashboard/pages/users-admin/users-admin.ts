import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UserList } from '../../components/user-list/user-list';

/**
 * Page component for the user administration view.
 * Displays the user management list and navigation to add new users.
 */
@Component({
  selector: 'app-users-admin',
  imports: [RouterLink, UserList],
  templateUrl: './users-admin.html',
  styleUrl: './users-admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersAdmin {}
