import { createAction, props } from '@ngrx/store';

export const authenticateUser = createAction('[Auth] Authenticate User');

export const authenticateUserSuccess = createAction(
  '[Auth] Authenticate User Success'
);

export const authenticateUserFailure = createAction(
  '[Auth] Authenticate User Failure',
  props<{ error: any }>()
);
