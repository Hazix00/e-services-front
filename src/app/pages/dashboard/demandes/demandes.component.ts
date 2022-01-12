import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { observable, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectUser } from 'src/app/store/auth/login/login.selectors';
import { selectuserInfos } from 'src/app/store/user/user.selectors';
import { forkJoin } from 'rxjs';
import { fetchFolders } from 'src/app/store/folders/folders.actions';
import { selectAllFolders } from 'src/app/store/folders/folders.selectors';
import { AddDemandeComponent } from 'src/app/components/demades/add-demande/add-demande.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.scss'],
})
export class DemandesComponent implements OnInit {
  user: any = null;
  workflowId!: string;
  folders$: Observable<any> = this.store.select(selectAllFolders);

  constructor(
    private route: ActivatedRoute,
    private readonly store: Store<AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.workflowId = id;
    });
    this.store.select(selectuserInfos).subscribe((user) => {
      this.user = user;
      if (user && this.workflowId) {
        this.store.dispatch(
          fetchFolders({ userId: user.id, worflowId: this.workflowId })
        );
      }
    });
  }

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
