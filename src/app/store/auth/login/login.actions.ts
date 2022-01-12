import { createAction, props } from '@ngrx/store';

export const fetchWorkflow = createAction('[Login] Fetch Workflow');

export const fetchWorkflowSuccess = createAction(
  '[Login] Fetch Workflow Success',
  props<{ workflow: any }>()
);

export const fetchWorkflowFailure = createAction(
  '[Login] Fetch Workflow Failure',
  props<{ error: any }>()
);

export const setWorkflowForm = createAction(
  '[Login] Set Workflow Form',
  props<{ form: any }>()
);

export const setWorkflowInputs = createAction(
  '[Login] Set Workflow Inputs',
  props<{ inputs: any[] }>()
);

export const loginUser = createAction(
  '[Login] Login User',
  props<{ email: string; password: string }>()
);

export const loginUserSuccess = createAction(
  '[Login] Login User Success',
  props<{ user: any }>()
);

export const loginUserFailure = createAction(
  '[Login] Login User Failure',
  props<{ error: any }>()
);
