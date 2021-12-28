import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DemandesCategoriesComponent } from './pages/demandes-categories/demandes-categories.component';
import { DemandesComponent } from './pages/demandes/demandes.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/account/registration/login/login.component';
import { RegisterInformationsComponent } from './pages/account/register-informations/register-informations.component';
import { RegisterComponent } from './pages/account/registration/register/register.component';
import { RegistrationComponent } from './pages/account/registration/registration.component';
import { GeneralitiesComponent } from './pages/account/register-informations/generalities/generalities.component';
import { ActivitiesComponent } from './pages/account/register-informations/activities/activities.component';

const routes: Routes = [
  { path:'account', component: AccountComponent,
    children: [
      { path: 'registration', component: RegistrationComponent,
        children: [
          { path:'', component: LoginComponent },
          { path:'login', component: LoginComponent },
          { path:'register', component: RegisterComponent },
        ]
      },
      { path:'register-informations', component: RegisterInformationsComponent,
        children: [
          { path:'', component: GeneralitiesComponent },
          { path:'generalities', component: GeneralitiesComponent },
          { path:'activities', component: ActivitiesComponent }
        ]
      },
    ]
  },
  { path:'dashboard', component: DashboardComponent,
    children: [
      { path:'demandes-categories', component: DemandesCategoriesComponent },
      { path:'demandes', component: DemandesComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard/demandes-categories', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
