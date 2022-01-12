import { createAction, props } from '@ngrx/store';

export const fetchWorkflows = createAction(
  '[Workflows] Fetch Workflows',
  props<{ userId: string }>()
);

export const fetchWorkflowsSuccess = createAction(
  '[Workflows] Fetch Workflows Success',
  props<{ workflows: any[] }>()
);

export const fetchWorkflowsFailure = createAction(
  '[Workflows] Fetch Workflows Failure',
  props<{ error: any }>()
);
