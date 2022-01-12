import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchFolders,
  fetchFoldersFailure,
  fetchFoldersSuccess,
} from './folders.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { UserWorkflowsService } from '../../services/userWorkflows/user-workflows.service';
// import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FolderState } from './folders.reducer';
import { UserFoldersService } from 'src/app/services/userFolders/user-folders.service';

@Injectable()
export class FoldersEffects {
  //!TODO :to be removed
  constructor(
    private actions$: Actions,
    private foldersService: UserFoldersService // private store: Store<AppState>
  ) {}

  fetchWorkflows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchFolders),
      switchMap((param) => {
        // Call the getTodos method, convert it to an observable
        return from(
          this.foldersService.getUserFoldersByWorkflowId(
            param.userId,
            param.worflowId
          )
        ).pipe(
          // Take the returned value and return a new success action containing the todos
          map((response: any) => {
            const folders = response.data;
            return fetchFoldersSuccess({ folders });
          }),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(fetchFoldersFailure({ error })))
        );
      })
    )
  );
}
