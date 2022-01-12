import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WorkflowsService } from 'src/app/services/workflows/workflows.service';

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

  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private readonly workflowService: WorkflowsService,
    private readonly route: ActivatedRoute
  ) {
    this.route.params.subscribe((data: any) => {
      const { id, workflowId } = data;

      if (workflowId) {
        this.workflowService.getWorkflowForms(workflowId).subscribe({
          next: (response) => {
            console.log(response);
            if (response.statusCode === 200) {
              this.forms = response.data;
              this.loading = false;
            }
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
          },
          complete: () => {
            console.log('complete');
            this.loading = false;
          },
        });
      }
    });
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  onSubmit(values: any) {
    console.log(values);
  }
}
