import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() last: any | undefined | null
  status: 'actif' | 'inactif' = 'actif'
  show = false

  constructor() { }

  ngOnInit(): void {
  }

}
