import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from 'src/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UserItemComponent } from './components/users/user-item/user-item.component';
import { UsersControlComponent } from './components/users/users-control/users-control.component';
import { JsonFormComponent } from './components/json-form/json-form.component';
import { DemandeDetailsComponent } from './components/demandes/demande-details/demande-details.component';
import { UsersManagementTabsComponent } from './components/users/users-management-tabs/users-management-tabs.component';
import { GroupListComponent } from './components/users/group-list/group-list.component';
import { GroupItemComponent } from './components/users/group-item/group-item.component';
import { GroupControlComponent } from './components/users/group-control/group-control.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { StandbyComponent } from './pages/account/standby/standby/standby.component';
import { Store, StoreModule } from '@ngrx/store';
import { workflowsReducer } from './store/workflows/workflows.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WorkflowsEffects } from './store/workflows/workflows.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { registerReducer } from './store/auth/register/register.reducer';
import { RegisterEffects } from './store/auth/register/register.effects';
import { loginReducer } from './store/auth/login/login.reducer';
import { LoginEffects } from './store/auth/login/login.effects';
import { JsonFormV2Component } from './components/json-form-v2/json-form-v2.component';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { AppState } from './store/app.state';
import { authenticateUser } from './store/auth/auth.actions';
import { userReducer } from './store/user/user.reducer';
import { selectuserInfos } from './store/user/user.selectors';
import { fetchWorkflows } from './store/workflows/workflows.actions';
import { foldersReducer } from './store/folders/folders.reducer';
import { FoldersEffects } from './store/folders/folders.effects';
import { ChatBoxComponent } from './components/chat/chat-box/chat-box.component';
import { ChatButtonComponent } from './components/chat/chat-button/chat-button.component';
import { AddDemandeComponent } from './components/demandes/add-demande/add-demande.component';
import { AddDemandePageComponent } from './pages/dashboard/add-demande-page/add-demande-page.component';

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
    JsonFormComponent,
    DemandeDetailsComponent,
    UsersManagementTabsComponent,
    GroupListComponent,
    GroupItemComponent,
    GroupControlComponent,
    UserDetailsComponent,
    StandbyComponent,
    JsonFormV2Component,
    ChatBoxComponent,
    ChatButtonComponent,
    AddDemandeComponent,
    AddDemandePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forRoot({
      workflows: workflowsReducer,
      register: registerReducer,
      login: loginReducer,
      auth: authReducer,
      user: userReducer,
      folders: foldersReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([
      WorkflowsEffects,
      RegisterEffects,
      LoginEffects,
      AuthEffects,
      FoldersEffects,
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private readonly store: Store<AppState>) {
    this.store.dispatch(authenticateUser());
    this.store.select(selectuserInfos).subscribe((user) => {
      if (user?.id) {
        this.store.dispatch(fetchWorkflows({ userId: user.id }));
      }
    });
  }
}
