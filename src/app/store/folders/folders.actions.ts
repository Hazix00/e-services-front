import { createAction, props } from '@ngrx/store';

export const fetchFolders = createAction(
  '[Folders] Fetch Folders',
  props<{ userId: string; worflowId: string }>()
);

export const fetchFoldersSuccess = createAction(
  '[Folders] Fetch Folders Success',
  props<{ folders: any[] }>()
);

export const fetchFoldersFailure = createAction(
  '[Folders] Fetch Folders Failure',
  props<{ error: any }>()
);
