import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import PosteResolve from './route/poste-routing-resolve.service';

const posteRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/poste.component').then(m => m.PosteComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/poste-detail.component').then(m => m.PosteDetailComponent),
    resolve: {
      poste: PosteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/poste-update.component').then(m => m.PosteUpdateComponent),
    resolve: {
      poste: PosteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/poste-update.component').then(m => m.PosteUpdateComponent),
    resolve: {
      poste: PosteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default posteRoute;
