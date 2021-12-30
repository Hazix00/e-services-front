import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-demandes-item',
  templateUrl: './demandes-item.component.html',
  styleUrls: ['./demandes-item.component.scss']
})
export class DemandesItemComponent implements OnInit {

  @Input() status!: string
  statusClasses = new Map()
  statusClass!: string

  constructor() { }

  ngOnInit(): void {

    this.statusClasses.set('En progression', 'loop',)
    this.statusClasses.set('Terminé', 'done',)
    this.statusClasses.set('Rejeté', 'do_disturb',)
    this.statusClass = this.statusClasses.get(this.status)
  }

}
