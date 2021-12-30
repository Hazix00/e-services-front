import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from 'src/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { DemandesComponent } from './pages/dashboard/demandes/demandes.component';
import { DemandesListComponent } from './components/demandes/demandes-list/demandes-list.component';
import { DemandesItemComponent } from './components/demandes/demandes-item/demandes-item.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { DemandesCategoriesComponent } from './pages/dashboard/demandes-categories/demandes-categories.component';
import { DemandeCategoryListComponent } from './components/demande-category/demande-category-list/demande-category-list.component';
import { DemandeCategoryItemComponent } from './components/demande-category/demande-category-item/demande-category-item.component';
import { DemandeCategoryControlComponent } from './components/demande-category/demande-category-control/demande-category-control.component';
import { DemandesControlComponent } from './components/demandes/demandes-control/demandes-control.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/account/registration/login/login.component';
import { RegisterComponent } from './pages/account/registration/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterInformationsComponent } from './pages/account/register-informations/register-informations.component';
import { GeneralitiesComponent } from './pages/account/register-informations/generalities/generalities.component';
import { ActivitiesComponent } from './pages/account/register-informations/activities/activities.component';
import { UsersComponent } from './pages/account/register-informations/users/users.component';
import { RegistrationComponent } from './pages/account/registration/registration.component';
import { UsersManagementComponent } from './pages/dashboard/users-management/users-management.component';
import { UsersListComponent } from './components/userss/users-list/users-list.component';
import { UserItemComponent } from './components/userss/user-item/user-item.component';
import { UsersControlComponent } from './components/userss/users-control/users-control.component';

@NgModule({
  declarations: [
    AppComponent,
    DemandesComponent,
    DemandesListComponent,
    DemandesItemComponent,
    MainMenuComponent,
    HeaderComponent,
    DemandesCategoriesComponent,
    DemandeCategoryListComponent,
    DemandeCategoryItemComponent,
    DemandeCategoryControlComponent,
    DemandesControlComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RegisterInformationsComponent,
    GeneralitiesComponent,
    ActivitiesComponent,
    UsersComponent,
    RegistrationComponent,
    UsersManagementComponent,
    UsersListComponent,
    UserItemComponent,
    UsersControlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
