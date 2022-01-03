import { Component, OnInit } from '@angular/core';
import { UsersManagementTabs } from 'src/app/constants/usersManagementTabs';
import { UsersManagementActiveTabService } from 'src/app/services/users-management-active-tab/users-management-active-tab.service';

@Component({
  selector: 'app-users-management-tabs',
  templateUrl: './users-management-tabs.component.html',
  styleUrls: ['./users-management-tabs.component.scss']
})
export class UsersManagementTabsComponent implements OnInit {

  activeTab!: UsersManagementTabs
  readonly UsersManagementTabs = UsersManagementTabs

  constructor(
    private readonly usersManagementTabsService: UsersManagementActiveTabService
  ) { }

  ngOnInit(): void {
    this.usersManagementTabsService.get()
      .subscribe( value => {
        this.activeTab = value
      })
  }

  setActiveTab(tab: UsersManagementTabs) {
    this.usersManagementTabsService.set(tab)
  }

}
