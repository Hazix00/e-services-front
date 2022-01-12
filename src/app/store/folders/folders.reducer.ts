import { createReducer, on } from '@ngrx/store';
import {
  fetchFolders,
  fetchFoldersSuccess,
  fetchFoldersFailure,
} from './folders.actions';

import { status } from '../../common/enums/status.enum';

export interface FolderState {
  folders: any[];
  loading: boolean;
  error: string;
  status: status;
}

export const initialState: FolderState = {
  folders: [],
  loading: false,
  error: '',
  status: status.PENDING,
};

export const foldersReducer = createReducer(
  initialState,
  on(fetchFolders, (state) => ({
    ...state,
    loading: true,
    error: '',
    status: status.LOADING,
  })),
  on(fetchFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders,
    loading: false,
    error: '',
    status: status.SUCCESS,
  })),
  on(fetchFoldersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    status: status.ERROR,
  }))
);
