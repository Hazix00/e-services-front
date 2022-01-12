import { createReducer, on } from '@ngrx/store';
import {
  fetchWorkflows,
  fetchWorkflowsFailure,
  fetchWorkflowsSuccess,
} from './workflows.actions';

import { status } from '../../common/enums/status.enum';

export interface WorkflowState {
  workflows: any[];
  loading: boolean;
  error: string;
  status: status;
}

export const initialState: WorkflowState = {
  workflows: [],
  loading: false,
  error: '',
  status: status.PENDING,
};

export const workflowsReducer = createReducer(
  initialState,
  on(fetchWorkflows, (state) => ({
    ...state,
    loading: true,
    error: '',
    status: status.LOADING,
  })),
  on(fetchWorkflowsSuccess, (state, { workflows }) => ({
    ...state,
    workflows,
    loading: false,
    error: '',
    status: status.SUCCESS,
  })),
  on(fetchWorkflowsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    status: status.ERROR,
  }))
);
