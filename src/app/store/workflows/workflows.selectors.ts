import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { WorkflowState } from './workflows.reducer';

export const appSelectWorkflows = (state: AppState) => state.workflows;
export const selectAllWorkflows = createSelector(
  appSelectWorkflows,
  (state: WorkflowState) => state.workflows
);
