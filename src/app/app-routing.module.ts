import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandesCategoriesComponent } from './pages/demandes-categories/demandes-categories.component';
import { DemandesComponent } from './pages/demandes/demandes.component';

const routes: Routes = [
  { path: '', redirectTo: 'demandes-categorites', pathMatch: 'full'},
  { path:'demandes-categorites', component: DemandesCategoriesComponent },
  { path:'demandes', component: DemandesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
