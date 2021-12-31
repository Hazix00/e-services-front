import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.scss']
})
export class DemandeDetailsComponent implements OnInit {

  infosOpen = true
  documentsOpen = true
  paymentOpen = true

  constructor() { }

  ngOnInit(): void {
  }

}
