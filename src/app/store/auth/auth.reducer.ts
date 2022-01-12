import { createReducer, on } from '@ngrx/store';
import { status } from 'src/app/common/enums/status.enum';
import {
  authenticateUser,
  authenticateUserFailure,
  authenticateUserSuccess,
} from './auth.actions';

export interface AuthState {
  loading: boolean;
  error: string;
  status: status;
}

export const initialState: AuthState = {
  loading: false,
  error: '',
  status: status.PENDING,
};

export const authReducer = createReducer(
  initialState,
  on(authenticateUser, (state) => ({
    ...state,
    loading: true,
    error: '',
    status: status.LOADING,
  })),
  on(authenticateUserSuccess, (state) => ({
    ...state,
    loading: false,
    error: '',
    status: status.SUCCESS,
  })),
  on(authenticateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    status: status.ERROR,
  }))
);
