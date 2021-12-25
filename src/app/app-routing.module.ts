import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandesCategoriesComponent } from './pages/demandes-categories/demandes-categories.component';
import { DemandesComponent } from './pages/demandes/demandes.component';

const routes: Routes = [
  { path:'demandes-categories', component: DemandesCategoriesComponent },
  { path:'demandes', component: DemandesComponent },
  { path: '**', redirectTo: 'demandes-categories', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
