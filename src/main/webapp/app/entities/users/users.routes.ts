import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import UsersResolve from './route/users-routing-resolve.service';

const usersRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/users.component').then(m => m.UsersComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/users-detail.component').then(m => m.UsersDetailComponent),
    resolve: {
      users: UsersResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/users-update.component').then(m => m.UsersUpdateComponent),
    resolve: {
      users: UsersResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/users-update.component').then(m => m.UsersUpdateComponent),
    resolve: {
      users: UsersResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default usersRoute;
