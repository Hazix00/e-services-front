import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  mergeMap,
} from 'rxjs/operators';
import {
  authenticateUser,
  authenticateUserFailure,
  authenticateUserSuccess,
} from './auth.actions';
import { setUser } from '../user/user.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService // private store: Store<AppState>
  ) {}

  authenticateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticateUser),
      switchMap(() => {
        // Call the getTodos method, convert it to an observable
        return from(this.authService.authenticate()).pipe(
          // Take the returned value and return a new success action containing the todos
          mergeMap((response: any) => {
            const user = response.user;
            user.publicUrls = response.publicUrls;
            return [authenticateUserSuccess(), setUser({ user })];
          }),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(authenticateUserFailure({ error })))
        );
      })
    )
  );
}
