import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FormService } from 'src/app/services/form/form.service';
import { UserService } from 'src/app/services/user/user.service';
export interface Form {
  _id: string;
  title?: string;
  inputs?: FormInput[];
  forms?: any[];
  status: string;
  conditions?: any[];
  workflow?: any;
  action: string;
  type?: string;
}
export interface Validation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
}

export interface FormInput {
  _id: string;
  label?: string;
  type: string;
  name: string;
  validation?: Validation;
  values?: any[];
  value?: any;
  disabled?: boolean;
}

export enum ActionType {
  REGISTER_USER = 'registerUser',
  LOGIN_USER = 'loginUser',
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  workflow?: any;
  form!: Form;
  formLoading: boolean = false;
  inputs: FormInput[] = [];
  errors: string[] = [];
  user?: any = {};
  defaultValues: any[] = [];
  categories: any[] = [];

  constructor(
    private readonly formService: FormService,
    private readonly userService: UserService,
    private readonly categoriesService: CategoriesService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('dmpUser')) {
      const user = JSON.parse(localStorage.getItem('dmpUser') || '');
      this.user = user;
      this.formService.getCurrentRegisterForm(user?.id).subscribe({
        next: (response) => {
          console.log(response);
          if (response?.statusCode === 200) {
            const form: Form = response.data;
            if (form.inputs) {
              this.inputs = form.inputs;
            }
            this.workflow = form?.workflow;
            this.form = form;
            if (form?.type === 'category') {
              this.categoriesService.findAll().subscribe({
                next: (response) => {
                  console.log(response);
                  if (response.statusCode === 200) {
                    this.categories = response.data;
                    this.inputs = this.categories.map((category: any) => {
                      return {
                        _id: category._id,
                        label: category.title,
                        type: 'checkbox',
                        name: category._id,
                      };
                    });
                  }
                },
                error: (error) => {
                  console.log(error);
                },
                complete: () => {
                  console.log('complete');
                },
              });
            }
          }
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      });

      this.getCurrentFormValues();
    } else {
      this.formService.getRegisterForm().subscribe({
        next: (response) => {
          console.log(response);
          if (response?.statusCode === 200) {
            const form: Form = response.data;
            if (form.inputs) {
              this.inputs = form.inputs;
            }
            this.workflow = form?.workflow;
            this.form = form;
          }
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
    }

    // this.formService.getForm(this.currentForm).subscribe((response) => {
    //   if (response.statusCode === 200) {
    //     const form: Form = response.data;
    //     this.inputs = form.inputs;
    //     this.workflow = form?.workflow;
    //     this.form = form;
    //     // console.log(form.inputs);
    //   }
    // });
    // this.userService.getUser().subscribe((response) => {
    //   console.log(response);
    //   if (response) {
    //     this.user = response;
    //     const userWorkflows = this.user.workflows;
    //     console.log(userWorkflows);
    //     const userForms = userWorkflows
    //       .map((workflow: any) => {
    //         return workflow.forms;
    //       })
    //       .flat();
    //     const currentForm = userForms?.find(
    //       (form: any) => form._id === this.currentForm
    //     );
    //     this.defaultValues = currentForm?.values;
    //     console.log(this.defaultValues);
    //   }
    // });
  }

  submitForm(formId: string, data: any) {
    this.formLoading = true;
    if (localStorage.getItem('dmpUser')) {
      const user = JSON.parse(localStorage.getItem('dmpUser') || '');
      data.user = user;
      data.workflowId = this.form?.workflow?._id;
    }
    this.formService.submitForm(formId, data).subscribe({
      next: (response) => {
        console.log(response);
        if (response.statusCode === 201) {
          const form: Form = response.data;
          if (form?.inputs) {
            this.inputs = form.inputs;
          }
          this.workflow = form?.workflow?.title;
          this.form = form;

          if (form?.type === 'category') {
            this.categoriesService.findAll().subscribe({
              next: (response: any) => {
                console.log(response);
                if (response.statusCode === 200) {
                  this.categories = response.data;
                  this.inputs = this.categories.map((category: any) => {
                    return {
                      _id: category._id,
                      label: category.title,
                      type: 'checkbox',
                      name: category._id,
                    };
                  });
                }
              },
              error: (error: any) => {
                console.log(error);
              },
              complete: () => {
                console.log('complete');
              },
            });
          }
        }

        if (response.statusCode >= 400) {
          this.errors = [response.message].flat();
        }
      },
      error: (response) => {
        const { error } = response;
        this.errors = [error?.message || 'Error'].flat();
        this.formLoading = false;
      },
      complete: () => {
        // console.log('complete');
        this.formLoading = false;
      },
    });
  }

  getCurrentFormValues() {
    if (localStorage.getItem('dmpUser')) {
      const user = JSON.parse(localStorage.getItem('dmpUser') || '');
      this.user = user;
      this.formService.getCurrentRegisterFormValues(user?.id).subscribe({
        next: (response) => {
          console.log(response);
          if (response?.statusCode === 200) {
            this.defaultValues = response.data?.map((item: any) => {
              return {
                ...item,
                _id: item?.inputId,
              };
            });
          }
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
    }
  }

  onSubmit(data: any) {
    if (!this.form?._id) return;

    if (this.form?.action === ActionType.REGISTER_USER) {
      const userInfos = Object.entries(data).reduce(
        (acc: any, curr: any, index) => {
          // console.log(curr);
          const input: any = this.inputs?.find(
            (input) => `${input._id}` === `${curr[0]}`
          );

          if (
            input &&
            (input.name === 'name' ||
              input.name === 'email' ||
              input.name === 'password')
          ) {
            acc[input.name] = curr[1];
          }
          return acc;
        },
        {}
      );
      // console.log('userInfo', userInfos);
      if (localStorage.getItem('dmpUser')) {
        this.submitForm(this.form?._id || '', data);
      } else {
        this.userService.registerUser(userInfos).subscribe({
          next: (response) => {
            console.log(response);
            localStorage.setItem('dmpUser', JSON.stringify(response?.user));
            data.user = response?.user;
            this.submitForm(this.form?._id || '', data);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            console.log('completed');
          },
        });
      }
    } else {
      this.formLoading = true;
      this.submitForm(this.form?._id, data);
    }
  }

  getPreviousForm() {
    if (localStorage.getItem('dmpUser')) {
      const user = JSON.parse(localStorage.getItem('dmpUser') || '');
      this.formService
        .getPreviousForm(this.form?._id, {
          user,
          workflowId: this.form?.workflow?._id,
        })
        .subscribe({
          next: (response) => {
            console.log(response);
            if (response.statusCode === 200) {
              const form: Form = response.data;
              if (form.inputs) {
                this.inputs = form.inputs;
              }
              this.workflow = form?.workflow?.title;
              this.form = form;
              this.getCurrentFormValues();
            }
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            console.log('complete');
          },
        });
    }
  }

  onPrevious(data: any) {
    console.log(data);
  }
}
