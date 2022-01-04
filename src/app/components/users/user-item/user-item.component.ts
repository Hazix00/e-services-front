import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() last: any | undefined | null
  status: 'actif' | 'inactif' = 'actif'
  show = false

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDetails(): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '410px',
      height: '310px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
