import { createReducer, on } from '@ngrx/store';
import { status } from 'src/app/common/enums/status.enum';
import { setUser } from './user.actions';

export interface UserState {
  infos: any | null;
  loading: boolean;
  error: string;
  status: status;
}

export const initialState: UserState = {
  infos: null,
  loading: false,
  error: '',
  status: status.PENDING,
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({
    ...state,
    infos: user,
  }))
);
