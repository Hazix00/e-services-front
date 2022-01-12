import { createAction, props } from '@ngrx/store';

export const setWorkflowForm = createAction(
  '[Register] Set Workflow Form',
  props<{ form: any }>()
);

export const setWorkflowInputs = createAction(
  '[Register] Set Workflow Inputs',
  props<{ inputs: any[] }>()
);

export const fetchInitialWorkflow = createAction(
  '[Register] Fetch Initial Workflow'
);

export const fetchInitialWorkflowSuccess = createAction(
  '[Register] Fetch Initial Workflow Success',
  props<{ workflow: any }>()
);

export const fetchInitialWorkflowFailure = createAction(
  '[Register] Fetch Initial Workflow Failure',
  props<{ error: any }>()
);
