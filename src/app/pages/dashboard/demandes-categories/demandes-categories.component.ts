import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AddDemandeComponent } from 'src/app/components/demades/add-demande/add-demande.component';
import { UserStoreService } from 'src/app/services/user-store/user-store.service';
import { UserWorkflowsService } from 'src/app/services/userWorkflows/user-workflows.service';
import { AppState } from 'src/app/store/app.state';
import { selectUser } from 'src/app/store/auth/login/login.selectors';
import { fetchWorkflows } from 'src/app/store/workflows/workflows.actions';
import { selectAllWorkflows } from 'src/app/store/workflows/workflows.selectors';

@Component({
  selector: 'app-demandes-categories',
  templateUrl: './demandes-categories.component.html',
  styleUrls: ['./demandes-categories.component.scss'],
})
export class DemandesCategoriesComponent implements OnInit {
  subscription?: Subscription;
  user?: any;
  workflows: any[] = [];

  constructor(
    private readonly store: Store<AppState>,
    public dialog: MatDialog
    ) {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
      if (user) {
        this.store.dispatch(fetchWorkflows({ userId: user.id }));
      }
    });
    this.store.select(selectAllWorkflows).subscribe((workflows) => {
      this.workflows = workflows;
    });
  }

  ngOnInit(): void {}
  addNewDemande(): void {
    const dialogRef = this.dialog.open(AddDemandeComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
