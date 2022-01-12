import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from './user.reducer';

export const appSelectUser = (state: AppState) => state.user;
export const selectuserInfos = createSelector(
  appSelectUser,
  (state: UserState) => state.infos
);
