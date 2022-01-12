import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LayoutViewToggleService } from 'src/app/services/layoutViewToggle/layout-view-toggle.service';
import { UserStoreService } from 'src/app/services/user-store/user-store.service';
import {
  CreateFolderDto,
  UserFoldersService,
} from 'src/app/services/userFolders/user-folders.service';
import { UserWorkflowsService } from 'src/app/services/userWorkflows/user-workflows.service';
import { AppState } from 'src/app/store/app.state';
import { selectuserInfos } from 'src/app/store/user/user.selectors';
import { fetchWorkflows } from 'src/app/store/workflows/workflows.actions';
import { selectAllWorkflows } from 'src/app/store/workflows/workflows.selectors';

@Component({
  selector: 'app-demande-category-list',
  templateUrl: './demande-category-list.component.html',
  styleUrls: ['./demande-category-list.component.scss'],
})
export class DemandeCategoryListComponent implements OnInit, OnChanges {
  layoutView!: 'grid' | 'list';
  subscription?: Subscription;
  workflows: Observable<any[]> = this.store.select(selectAllWorkflows);
  loading: boolean = true;
  selectedWorkflow: string = '';
  user: any = null;

  constructor(
    private readonly store: Store<AppState>,
    private readonly foldersService: UserFoldersService,
    private readonly router: Router
  ) {
    this.store.select(selectuserInfos).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: any) {
    console.log('changes', changes);
  }

  createFolder() {
    if (this.selectedWorkflow && this.user) {
      console.log(this.selectedWorkflow);
      console.log(this.user);
      const createFolderDto: CreateFolderDto = {
        workflowId: this.selectedWorkflow,
        userId: this.user.id,
      };
      this.foldersService.createFolder(createFolderDto).subscribe({
        next: (response: any) => {
          if (response?.statusCode === 201) {
            this.router.navigate([
              `/dashboard/demandes-categories/${this.selectedWorkflow}/demandes/${response?.data?._id}`,
            ]);
          }
        },
        error: (err) => {
          console.log('error', err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    }
  }
}
