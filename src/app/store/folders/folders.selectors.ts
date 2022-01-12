import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { FolderState } from './folders.reducer';

export const appSelectFolders = (state: AppState) => state.folders;
export const selectAllFolders = createSelector(
  appSelectFolders,
  (state: FolderState) => state.folders
);
