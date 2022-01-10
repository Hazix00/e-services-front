import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DemandesCategoriesComponent } from './pages/dashboard/demandes-categories/demandes-categories.component';
import { DemandesComponent } from './pages/dashboard/demandes/demandes.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/account/registration/login/login.component';
import { RegisterInformationsComponent } from './pages/account/register-informations/register-informations.component';
import { RegisterComponent } from './pages/account/registration/register/register.component';
import { RegistrationComponent } from './pages/account/registration/registration.component';
import { GeneralitiesComponent } from './pages/account/register-informations/generalities/generalities.component';
import { ActivitiesComponent } from './pages/account/register-informations/activities/activities.component';
import { UsersManagementComponent } from './pages/dashboard/users-management/users-management.component';
import { DemandeDetailsComponent } from './components/demandes/demande-details/demande-details.component';
import { WorkflowsManagementComponent } from './pages/workflows-management/workflows-management.component';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: 'registration',
        component: RegistrationComponent,
        children: [
          { path: '', component: LoginComponent },
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
        ],
      },
      {
        path: 'register-informations',
        component: RegisterInformationsComponent,
        children: [
          { path: '', component: GeneralitiesComponent },
          { path: 'generalities', component: GeneralitiesComponent },
          { path: 'activities', component: ActivitiesComponent },
        ],
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DemandesCategoriesComponent },
      { path: 'demandes-categories', component: DemandesCategoriesComponent },
      { path: 'demandes', component: DemandesComponent },
      { path: 'demandes/:demande_id', component: DemandeDetailsComponent },
      { path: 'users-management', component: UsersManagementComponent },
      { path: 'workflows-management', component: WorkflowsManagementComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'account/registration/register',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
