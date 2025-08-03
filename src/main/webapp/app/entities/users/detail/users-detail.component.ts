import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IUsers } from '../users.model';

@Component({
  selector: 'jhi-users-detail',
  templateUrl: './users-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class UsersDetailComponent {
  users = input<IUsers | null>(null);

  previousState(): void {
    window.history.back();
  }
}
