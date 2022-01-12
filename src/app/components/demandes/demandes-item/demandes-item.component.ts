import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demandes-item',
  templateUrl: './demandes-item.component.html',
  styleUrls: ['./demandes-item.component.scss'],
})
export class DemandesItemComponent implements OnInit {
  @Input() status!: string;
  @Input() id!: string;
  @Input() workflowId!: string;

  statusClasses = new Map();
  statusClass!: string;
  clientDetailsOpen = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.statusClasses.set('En progression', 'loop');
    this.statusClasses.set('Terminé', 'done');
    this.statusClasses.set('Rejeté', 'do_disturb');
    this.statusClasses.set('En pause', 'pause_circle_outline');
    this.statusClass = this.statusClasses.get(this.status);
  }

  goToDetailPage() {
    // console.log('go to detail page');
    this.router.navigate([
      `/dashboard/demandes-categories/${this.workflowId}/demandes/${this.id}`,
    ]);
  }
}
