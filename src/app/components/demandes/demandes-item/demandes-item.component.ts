import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectuserInfos } from 'src/app/store/user/user.selectors';
import { selectAllWorkflows } from 'src/app/store/workflows/workflows.selectors';

@Component({
  selector: 'app-demandes-item',
  templateUrl: './demandes-item.component.html',
  styleUrls: ['./demandes-item.component.scss'],
})
export class DemandesItemComponent implements OnInit {
  @Input() status!: string;
  @Input() id!: string;
  @Input() workflowId!: string;
  @Input() createdAt!: string;
  @Input() currentStep!: number;

  statusClasses = new Map();
  statusClass!: string;
  clientDetailsOpen = false;
  workFlow!: any;
  allWorkflowSteps: any[] = [];
  user: any = null;

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.statusClasses.set('En progression', 'loop');
    this.statusClasses.set('Terminé', 'done');
    this.statusClasses.set('Rejeté', 'do_disturb');
    this.statusClasses.set('En pause', 'pause_circle_outline');
    this.statusClass = this.statusClasses.get(this.status);
    this.store.select(selectAllWorkflows).subscribe((workflows) => {
      this.workFlow = workflows.find(
        (workflow) => workflow._id === this.workflowId
      );
      this.allWorkflowSteps = this.workFlow?.forms || [];
    });
    this.store.select(selectuserInfos).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  goToDetailPage() {
    // console.log('go to detail page');
    this.router.navigate([
      `/dashboard/demandes-categories/${this.workflowId}/demandes/${this.id}`,
    ]);
  }
}
