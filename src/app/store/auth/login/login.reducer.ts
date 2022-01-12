import { createReducer, on } from '@ngrx/store';
import { status } from 'src/app/common/enums/status.enum';
import {
  fetchWorkflow,
  fetchWorkflowFailure,
  fetchWorkflowSuccess,
  setWorkflowForm,
  setWorkflowInputs,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
} from './login.actions';

export interface LoginState {
  workflow: any | null;
  form: any | null;
  inputs: any[];
  loading: boolean;
  error: string;
  status: status;
  loginLoading: boolean;
  loginError: string;
  loginStatus: status;
  user: any | null;
}

export const initialState: LoginState = {
  workflow: null,
  inputs: [],
  form: null,
  loading: false,
  error: '',
  status: status.PENDING,
  user: null,
  loginLoading: false,
  loginError: '',
  loginStatus: status.PENDING,
};

export const loginReducer = createReducer(
  initialState,
  on(setWorkflowForm, (state, { form }) => ({
    ...state,
    form,
  })),
  on(setWorkflowInputs, (state, { inputs }) => ({
    ...state,
    inputs,
  })),
  on(fetchWorkflow, (state) => ({
    ...state,
    loading: true,
    error: '',
    status: status.LOADING,
  })),
  on(fetchWorkflowSuccess, (state, { workflow }) => ({
    ...state,
    workflow,
    loading: false,
    error: '',
    status: status.SUCCESS,
  })),
  on(fetchWorkflowFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    status: status.ERROR,
  })),
  on(loginUser, (state) => ({
    ...state,
    loginLoading: true,
    loginError: '',
    loginStatus: status.LOADING,
  })),
  on(loginUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loginLoading: false,
    loginError: '',
    loginStatus: status.SUCCESS,
  })),
  on(loginUserFailure, (state, { error }) => ({
    ...state,
    loginLoading: false,
    loginError: error,
    loginStatus: status.ERROR,
  }))
);
