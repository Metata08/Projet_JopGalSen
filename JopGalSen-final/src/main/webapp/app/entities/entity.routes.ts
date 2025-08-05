import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'jopGalSenApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'domaine',
    data: { pageTitle: 'jopGalSenApp.domaine.home.title' },
    loadChildren: () => import('./domaine/domaine.routes'),
  },
  {
    path: 'poste',
    data: { pageTitle: 'jopGalSenApp.poste.home.title' },
    loadChildren: () => import('./poste/poste.routes'),
  },
  {
    path: 'offre',
    data: { pageTitle: 'jopGalSenApp.offre.home.title' },
    loadChildren: () => import('./offre/offre.routes'),
  },
  {
    path: 'candidature',
    data: { pageTitle: 'jopGalSenApp.candidature.home.title' },
    loadChildren: () => import('./candidature/candidature.routes'),
  },
  {
    path: 'candidat',
    data: { pageTitle: 'jopGalSenApp.candidat.home.title' },
    loadChildren: () => import('./candidat/candidat.routes'),
  },
  {
    path: 'recruteur',
    data: { pageTitle: 'jopGalSenApp.recruteur.home.title' },
    loadChildren: () => import('./recruteur/recruteur.routes'),
  },
  {
    path: 'notification',
    data: { pageTitle: 'jopGalSenApp.notification.home.title' },
    loadChildren: () => import('./notification/notification.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
