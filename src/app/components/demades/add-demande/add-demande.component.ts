import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.scss']
})
export class AddDemandeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddDemandeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
