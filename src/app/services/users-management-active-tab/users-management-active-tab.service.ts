import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsersManagementTabs } from 'src/app/constants/usersManagementTabs';

@Injectable({
  providedIn: 'root'
})

export class UsersManagementActiveTabService {

  private activeTab = new BehaviorSubject<UsersManagementTabs>(UsersManagementTabs.Clients)

  get = () => this.activeTab.asObservable()
  set = (value: UsersManagementTabs) => this.activeTab.next(value)
}
