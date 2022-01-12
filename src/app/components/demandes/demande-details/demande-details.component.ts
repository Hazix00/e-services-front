import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { WorkflowsService } from 'src/app/services/workflows/workflows.service';
import { FormService } from 'src/app/services/form/form.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectuserInfos } from 'src/app/store/user/user.selectors';
import { UserFoldersService } from 'src/app/services/userFolders/user-folders.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.scss'],
})
export class DemandeDetailsComponent implements OnInit {
  infosOpen = false;
  documentsOpen = false;
  paymentOpen = false;
  forms: any = [];
  loading = true;
  user: any = null;
  folder: any = null;
  folderId!: string;
  selectedIndex: number = 0;
  isLinear = true;
  userValues: any[] = [];

  constructor(
    private readonly workflowService: WorkflowsService,
    private readonly folderService: UserFoldersService,
    private readonly route: ActivatedRoute,
    private readonly formService: FormService,
    private readonly store: Store<AppState>
  ) {
    this.route.params.subscribe((data: any) => {
      const { id, workflowId } = data;
      if (id && workflowId) {
        this.folderId = id;
        this.folderService
          .getFolderById(id)
          .pipe(
            tap((folderResponse) => {
              if (folderResponse.statusCode === 200) {
                this.folder = folderResponse.data;
              }
            }),
            switchMap(() => {
              return this.workflowService.getWorkflowForms(workflowId);
            }),
            tap((formsResponse) => {
              if (formsResponse.statusCode === 200) {
                this.forms = formsResponse.data;
                this.loading = false;
                this.forms = this.forms.map((form: any) => {
                  const forms = this.folder?.forms || [];
                  if (forms.length < 1) return form;
                  const found = forms.find((f: any) => f.formId === form._id);
                  if (found) {
                    return {
                      ...form,
                      inputs: form.inputs.map((input: any) => {
                        const foundInput = found.values.find(
                          (i: any) => i.inputId === input._id
                        );
                        if (foundInput) {
                          return {
                            ...input,
                            userValues: foundInput,
                          };
                        }
                        return input;
                      }),
                    };
                  }
                  return form;
                });
              }
            })
          )
          .subscribe();
      }
    });

    this.store.select(selectuserInfos).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit() {}

  onSubmit(formId: string, values: any, stepper: MatStepper) {
    console.log(values, stepper);
    // stepper.next();
    if (!this.user) return;
    values.userId = this.user.id;
    values.folderId = this.folderId;
    this.formService.submitForm(formId, values).subscribe({
      next: (response) => {
        if (response.statusCode === 201) {
          stepper.next();
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  goNext(stepper: MatStepper) {
    // console.log(stepper);
    stepper.next();
  }

  goBack(stepper: MatStepper) {
    // console.log(stepper);
    stepper.previous();
  }
}
