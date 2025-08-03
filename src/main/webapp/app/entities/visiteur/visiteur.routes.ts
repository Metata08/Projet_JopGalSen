import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import VisiteurResolve from './route/visiteur-routing-resolve.service';

const visiteurRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/visiteur.component').then(m => m.VisiteurComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/visiteur-detail.component').then(m => m.VisiteurDetailComponent),
    resolve: {
      visiteur: VisiteurResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/visiteur-update.component').then(m => m.VisiteurUpdateComponent),
    resolve: {
      visiteur: VisiteurResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/visiteur-update.component').then(m => m.VisiteurUpdateComponent),
    resolve: {
      visiteur: VisiteurResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default visiteurRoute;
