import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AdminDashbordComponent } from './pages/admin-dashbord/admin-dashbord.component';
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
    {path : 'auth', component: AuthComponent},
    {
        path : 'admin-dashbord', 
        component: AdminDashbordComponent, 
        canActivate: [AuthGuard, RoleGuard], 
        data: { requiredRole: 'admin' }
    },
    {
        path : 'candidat-dashbord', 
        component: CandidatDashbordComponent,
        /*canActivate: [AuthGuard, RoleGuard], 
        data: { requiredRole: 'candidat' }*/
    },
    {
        path : 'recruteur-dashbord', 
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
