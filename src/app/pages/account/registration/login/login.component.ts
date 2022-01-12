import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store/user-store.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  fetchWorkflow,
  loginUser,
} from 'src/app/store/auth/login/login.actions';
import {
  selectAllInputs,
  selectLoginForm,
  selectLoginWorkflow,
  selectLoginFormLoading,
  selectUser,
} from 'src/app/store/auth/login/login.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  inputs: any[] = [];
  form: any | null;
  workflow: any = {};
  loading = true;

  user: any = null;

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fetchWorkflow());
    this.store.select(selectLoginFormLoading).subscribe((loading) => {
      this.loading = loading;
    });
    this.store.select(selectAllInputs).subscribe((inputs) => {
      this.inputs = inputs;
    });
    this.store.select(selectLoginWorkflow).subscribe((workflow) => {
      this.workflow = workflow;
    });
    this.store.select(selectLoginForm).subscribe((form) => {
      this.form = form;
    });

    this.store.select(selectUser).subscribe((user) => {
      this.user = user;

      if (user?.isActive) {
        this.router.navigate(['/dashboard/demandes-categories']);
      }
    });
  }

  onSubmit(data: any) {
    // console.log(data);
    const email = this.inputs.find((input) => input.type === 'email');
    const password = this.inputs.find((input) => input.type === 'password');
    if (!email || !password) return;
    this.store.dispatch(
      loginUser({ email: data[email._id], password: data[password._id] })
    );
  }
}
