import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DemandesCategoriesComponent } from './pages/demandes-categories/demandes-categories.component';
import { DemandesComponent } from './pages/demandes/demandes.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';

const routes: Routes = [
  { path:'login', component: LoginPageComponent,
    children: [
      { path:'', component: LoginComponent },
      { path:'register', component: RegisterComponent },
    ]
  },
  { path:'register', component: LoginPageComponent },
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
