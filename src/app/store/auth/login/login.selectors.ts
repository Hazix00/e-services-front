import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { LoginState } from './login.reducer';

export const appSelectLogin = (state: AppState) => state.login;
export const selectAllInputs = createSelector(
  appSelectLogin,
  (state: LoginState) => state.inputs
);

export const selectLoginForm = createSelector(
  appSelectLogin,
  (state: LoginState) => state.form
);

export const selectLoginFormLoading = createSelector(
  appSelectLogin,
  (state: LoginState) => state.loading
);

export const selectLoginWorkflow = createSelector(
  appSelectLogin,
  (state: LoginState) => state.form
);

export const selectUser = createSelector(
  appSelectLogin,
  (state: LoginState) => state.user
);
