import { Component, OnInit } from '@angular/core';
import { UsersManagementTabs } from 'src/app/constants/usersManagementTabs';
import { UsersManagementActiveTabService } from 'src/app/services/users-management-active-tab/users-management-active-tab.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {

  activeTab!: UsersManagementTabs
  readonly UsersManagementTabs = UsersManagementTabs

  constructor(
    private readonly usersManagementActiveTabService: UsersManagementActiveTabService
  ) { }

  ngOnInit(): void {
    this.usersManagementActiveTabService.get()
      .subscribe( value => {
        this.activeTab = value
      })
  }

}
