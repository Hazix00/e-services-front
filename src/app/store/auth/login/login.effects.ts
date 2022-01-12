import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  fetchWorkflow,
  fetchWorkflowFailure,
  fetchWorkflowSuccess,
  setWorkflowForm,
  setWorkflowInputs,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
} from './login.actions';
import { setUser } from '../../user/user.actions';

@Injectable()
export class LoginEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly loginService: LoginService
  ) {}

  fetchWorkflow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWorkflow),
      switchMap(() => {
        // Call the getTodos method, convert it to an observable
        return from(this.loginService.getLoginForm()).pipe(
          // Take the returned value and return a new success action containing the todos
          mergeMap((response: any) => {
            console.log('response', response);
            const { workflow, inputs, ...form } = response.data;
            return [
              fetchWorkflowSuccess({ workflow }),
              setWorkflowInputs({ inputs }),
              setWorkflowForm({ form }),
            ];
          }),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(fetchWorkflowFailure({ error })))
        );
      })
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap((param) => {
        // Call the getTodos method, convert it to an observable
        return from(
          this.loginService.loginUser(param.email, param.password)
        ).pipe(
          // Take the returned value and return a new success action containing the todos
          mergeMap((response: any) => {
            return [loginUserSuccess(response), setUser({ user: response })];
          }),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loginUserFailure({ error })))
        );
      })
    )
  );
}
