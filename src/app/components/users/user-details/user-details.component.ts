import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface UserData {
  fullName: string,
  email: string,
  establishment: string,
  group: string,
  status: 'actif' | 'inactif'
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
  ) {}
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
