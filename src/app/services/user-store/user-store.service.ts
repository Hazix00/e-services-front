import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private user?: any;
  private workflows: any[] = [];
  private subject = new Subject<any>();

  constructor() {}

  setuser(user: any) {
    this.user = user;
    this.subject.next(this.user);
  }

  onUserChange(): any {
    return this.subject.asObservable();
  }

  onUserWorkflowsChange(): any {
    return this.subject.asObservable();
  }

  setUserWorkflos(workflows: any[]): any {
    this.workflows = workflows;
    this.subject.next(this.workflows);
    //todo
  }
}
