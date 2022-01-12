import { createReducer, on } from '@ngrx/store';
import { status } from 'src/app/common/enums/status.enum';
import {
  fetchInitialWorkflow,
  fetchInitialWorkflowFailure,
  fetchInitialWorkflowSuccess,
  setWorkflowForm,
  setWorkflowInputs,
} from './register.actions';

export interface RegisterState {
  workflow: any | null;
  form: any | null;
  inputs: any[];
  loading: boolean;
  error: string;
  status: status;
}

export const initialState: RegisterState = {
  workflow: null,
  inputs: [],
  form: null,
  loading: false,
  error: '',
  status: status.PENDING,
};

export const registerReducer = createReducer(
  initialState,
  on(setWorkflowForm, (state, { form }) => ({
    ...state,
    form,
  })),
  on(setWorkflowInputs, (state, { inputs }) => ({
    ...state,
    inputs,
  })),
  on(fetchInitialWorkflow, (state) => ({
    ...state,
    loading: true,
    error: '',
    status: status.LOADING,
  })),
  on(fetchInitialWorkflowSuccess, (state, { workflow }) => ({
    ...state,
    workflow,
    loading: false,
    error: '',
    status: status.SUCCESS,
  })),
  on(fetchInitialWorkflowFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    status: status.ERROR,
  }))
);
