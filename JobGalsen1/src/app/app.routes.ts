import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AProposComponent } from './pages/a-propos/a-propos.component';
import { OffresComponent } from './pages/offres/offres.component';
import { EntreprisesComponent } from './pages/entreprises/entreprises.component';
import { ConseilsComponent } from './pages/conseils/conseils.component';

/** Admin Dashboard Components **/
import { DashboardComponent } from './pages/admin-dashbord/pages/dashboard/dashboard.component';
import { TopbarComponent } from './pages/admin-dashbord/topbar/topbar.component';
import { SidebarComponent } from './pages/admin-dashbord/sidebar/sidebar.component';
import { AdminLayoutComponent } from './pages/admin-dashbord/admin-layout/admin-layout.component';
import { GraphiquesComponent } from './pages/admin-dashbord/composants/graphiques/graphiques.component';
import { RecentActivityComponent } from './pages/admin-dashbord/composants/recent-activity/recent-activity.component';
import { StatsCardComponent } from './pages/admin-dashbord/composants/stats-card/stats-card.component';

import { AdminComponent } from './pages/admin-dashbord/admin.component';
import { AdminCandidaturesComponent } from './pages/admin-dashbord/pages/candidatures/candidatures.component';
import { AdminEntreprisesComponent } from './pages/admin-dashbord/pages/entreprises/entreprises.component';
import { AdminMessagesComponent } from './pages/admin-dashbord/pages/messages/messages.component';
import { AdminOffresComponent } from './pages/admin-dashbord/pages/offres/offres.component';
import { AdminParametresComponent } from './pages/admin-dashbord/pages/parametres/parametres.component';
import { AdminUtilisateursComponent } from './pages/admin-dashbord/pages/utilisateurs/utilisateurs.component';

/** Candidat et Recruteur Dashboard Components **/
import { CandidatDashbordComponent } from './pages/candidat-dashbord/candidat-dashbord.component';
import { RecruteurDashbordComponent } from './pages/recruteur-dashbord/recruteur-dashbord.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CreateEmploiComponent } from './pages/create-emploi/create-emploi.component';
import { DetailsEmploiComponent } from './pages/details-emploi/details-emploi.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    { path: 'accueil', component: AccueilComponent },
    { path: 'a-propos', component: AProposComponent },
    { path: 'offres', component: OffresComponent },
    { path: 'entreprises', component: EntreprisesComponent },
    { path: 'conseils', component: ConseilsComponent },
    {path : 'auth', component: AuthComponent},

    /** Dashboard Admin */
    {
        path : 'admin', 
        component: AdminComponent, 
        /*canActivate: [AuthGuard, RoleGuard], 
        data: { requiredRole: 'admin' }*/
        children: [
            {path : 'dashboard', component: DashboardComponent},
            {path : 'utilisateurs', component: AdminUtilisateursComponent},
            {path : 'messages', component: AdminMessagesComponent},
            {path : 'entreprises', component: AdminEntreprisesComponent},
            {path : 'offres', component: AdminOffresComponent},
            {path : 'candidatures', component: AdminCandidaturesComponent},
            {path : 'parametres', component: AdminParametresComponent},
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    },

    /** Dashboard Candidat */
    {
        path : 'candidat', 
        component: CandidatDashbordComponent,
        /*canActivate: [AuthGuard, RoleGuard], 
        data: { requiredRole: 'candidat' }*/
    },



    /** Dashboard Recruteur */
    {
        path : 'recruteur', 
        component: RecruteurDashbordComponent,
        /*canActivate: [AuthGuard, RoleGuard],
        data: { requiredRole: 'recruteur' }*/
    },
    {
        path : 'create-emploi', 
        component: CreateEmploiComponent,
        /*canActivate: [AuthGuard, RoleGuard],
        data: { requiredRole: 'recruteur' }*/
    },
    {
        path : 'details-emploi/:id', 
        component: DetailsEmploiComponent,
        canActivate: [AuthGuard],
        data: { requiredRole: 'candidat' },
    },
    {
        path : 'profile', 
        component: ProfileComponent,
        /*canActivate: [AuthGuard],
        data: { requiredRole: 'candidat' }*/
    }
];
