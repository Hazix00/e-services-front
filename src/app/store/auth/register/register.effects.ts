import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegisterService } from 'src/app/services/auth/register.service';
import { from, of } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import {
  fetchInitialWorkflow,
  fetchInitialWorkflowFailure,
  fetchInitialWorkflowSuccess,
  setWorkflowForm,
  setWorkflowInputs,
} from './register.actions';

@Injectable()
export class RegisterEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly registerService: RegisterService
  ) {}

  fetchInitialWorkflow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchInitialWorkflow),
      switchMap(() => {
        // Call the getTodos method, convert it to an observable
        return from(this.registerService.getRegisterForm()).pipe(
          // Take the returned value and return a new success action containing the todos
          mergeMap((response: any) => {
            const { workflow, inputs, ...form } = response.data;
            return [
              fetchInitialWorkflowSuccess({ workflow }),
              setWorkflowInputs({ inputs }),
              setWorkflowForm({ form }),
            ];
          }),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(fetchInitialWorkflowFailure({ error })))
        );
      })
    )
  );
}
