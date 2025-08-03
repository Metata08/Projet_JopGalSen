import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'jobCalsenApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'domaine',
    data: { pageTitle: 'jobCalsenApp.domaine.home.title' },
    loadChildren: () => import('./domaine/domaine.routes'),
  },
  {
    path: 'poste',
    data: { pageTitle: 'jobCalsenApp.poste.home.title' },
    loadChildren: () => import('./poste/poste.routes'),
  },
  {
    path: 'offre',
    data: { pageTitle: 'jobCalsenApp.offre.home.title' },
    loadChildren: () => import('./offre/offre.routes'),
  },
  {
    path: 'notification',
    data: { pageTitle: 'jobCalsenApp.notification.home.title' },
    loadChildren: () => import('./notification/notification.routes'),
  },
  {
    path: 'users',
    data: { pageTitle: 'jobCalsenApp.users.home.title' },
    loadChildren: () => import('./users/users.routes'),
  },
  {
    path: 'visiteur',
    data: { pageTitle: 'jobCalsenApp.visiteur.home.title' },
    loadChildren: () => import('./visiteur/visiteur.routes'),
  },
  {
    path: 'recruteur',
    data: { pageTitle: 'jobCalsenApp.recruteur.home.title' },
    loadChildren: () => import('./recruteur/recruteur.routes'),
  },
  {
    path: 'candidature',
    data: { pageTitle: 'jobCalsenApp.candidature.home.title' },
    loadChildren: () => import('./candidature/candidature.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
