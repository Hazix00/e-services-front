import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demandes-list',
  templateUrl: './demandes-list.component.html',
  styleUrls: ['./demandes-list.component.scss']
})
export class DemandesListComponent implements OnInit {

  dummy_list = [
    'En progression',
    'Terminé',
    'Terminé',
    'En progression',
    'Rejeté',
    'En progression'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
