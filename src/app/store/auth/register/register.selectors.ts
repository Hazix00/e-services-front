import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { RegisterState } from './register.reducer';

export const appSelectRegister = (state: AppState) => state.register;
export const selectRegisterWorkflow = createSelector(
  appSelectRegister,
  (state: RegisterState) => state.workflow
);
