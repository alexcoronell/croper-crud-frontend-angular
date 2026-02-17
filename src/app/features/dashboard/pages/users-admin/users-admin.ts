import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserList } from '../../components/user-list/user-list';

@Component({
  selector: 'app-users-admin',
  imports: [RouterLink, UserList],
  templateUrl: './users-admin.html',
  styleUrl: './users-admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersAdmin {}
