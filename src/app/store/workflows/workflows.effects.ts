import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchWorkflows,
  fetchWorkflowsFailure,
  fetchWorkflowsSuccess,
} from './workflows.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { UserWorkflowsService } from '../../services/userWorkflows/user-workflows.service';
// import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { WorkflowState } from './workflows.reducer';

@Injectable()
export class WorkflowsEffects {
  //!TODO :to be removed
  constructor(
    private actions$: Actions,
    private workflowsService: UserWorkflowsService // private store: Store<AppState>
  ) {}

  fetchWorkflows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWorkflows),
      switchMap((param) => {
        // Call the getTodos method, convert it to an observable
        return from(this.workflowsService.getWorkflows(param.userId)).pipe(
          // Take the returned value and return a new success action containing the todos
          map((response: any) => {
            const workflows = response.data;
            return fetchWorkflowsSuccess({ workflows });
          }),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(fetchWorkflowsFailure({ error })))
        );
      })
    )
  );
}
