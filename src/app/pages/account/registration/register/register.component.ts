import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/auth/register.service';
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
  subcategories: any[];
  children: any[];
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
  clientID: string | null = null;

  constructor(
    private readonly formService: FormService,
    private readonly userService: UserService,
    private readonly categoriesService: CategoriesService,
    private readonly registerService: RegisterService
  ) {}

  ngOnInit(): void {
    const clientID = localStorage.getItem('clientID');
    if (clientID) {
      this.clientID = clientID;
      this.registerService.getCurrentRegisterForm(clientID).subscribe({
        next: (response) => {
          if (response.statusCode === 200) {
            const form: Form = response.data;

            if (form.type !== 'category') {
              if (form.inputs) {
                this.inputs = form.inputs;
              }
              this.workflow = form?.workflow;
              this.form = form;
              console.log(form);
              if (form?.inputs) {
                this.defaultValues = form?.inputs?.map((input: any) => {
                  return {
                    ...input,
                    value: input?.values[0]?.value,
                    canEdit: input?.values[0]?.canEdit,
                  };
                });
              }
            }

            if (form.type === 'category') {
              this.workflow = form?.workflow;
              this.form = form;
              if (form.inputs) {
                this.inputs = form.inputs;
                const finalArray: any[] = [];
                this.form?.inputs?.forEach((input) => {
                  if (input.type === 'checkbox') {
                    finalArray.push({
                      ...input,
                      _id: input._id,
                      inputId: `${input._id}`,
                      name: input.name,
                      value: input?.value,
                    });
                  }

                  if (input?.subcategories) {
                    input.subcategories.forEach((subcategory) => {
                      if (subcategory.type === 'checkbox') {
                        finalArray.push({
                          ...subcategory,
                          _id: `${subcategory._id}_${input._id}`,
                          inputId: `${subcategory._id}_${input._id}`,
                          name: subcategory.name,
                          value: subcategory?.value,
                        });
                      }
                    });
                  }

                  if (input?.children) {
                    input.children.forEach((child) => {
                      if (child.type === 'checkbox') {
                        finalArray.push({
                          ...child,
                          _id: `${child._id}_${input._id}`,
                          inputId: `${child._id}_${input._id}`,
                          name: child.name,
                          value: child?.value,
                        });
                      }
                    });
                  }
                });

                // console.log(finalArray);

                this.defaultValues = finalArray;
              }
            }
          }
        },
        error: (error: any) => {},
        complete: () => {},
      });
    } else {
      this.registerService.getRegisterForm().subscribe({
        next: (response) => {
          console.log(response);
          if (response.statusCode === 200) {
            const form: Form = response.data;
            if (form.inputs) {
              this.inputs = form.inputs;
            }
            this.workflow = form?.workflow;
            this.form = form;
          }
        },
        error: (error: any) => {},
        complete: () => {},
      });
    }
  }

  onSubmit(data: any) {
    data.formId = this.form?._id;
    console.log(data);
    if (this.clientID) {
      data.userId = this.clientID;
    }
    if (this.form?.type === 'category') {
      const finalArray: any[] = [];
      this.form?.inputs?.forEach((input) => {
        if (input.type === 'checkbox') {
          finalArray.push({
            _id: input._id,
            inputId: `${input._id}`,
            name: input.name,
            value: data[input._id],
          });
        }

        if (input?.subcategories) {
          input.subcategories.forEach((subcategory) => {
            if (subcategory.type === 'checkbox') {
              finalArray.push({
                _id: `${subcategory._id}_${input._id}`,
                inputId: `${subcategory._id}_${input._id}`,
                name: subcategory.name,
                value: data[`${subcategory._id}_${input._id}`],
              });
            }
          });
        }

        if (input?.children) {
          input.children.forEach((child) => {
            if (child.type === 'checkbox') {
              finalArray.push({
                _id: `${child._id}_${input._id}`,
                inputId: `${child._id}_${input._id}`,
                name: child.name,
                value: data[`${child._id}_${input._id}`],
              });
            }
          });
        }
      });
      data.inputs = [...finalArray];
      // console.log(data);
    }
    this.registerService.submitregisterForm(data).subscribe({
      next: (response) => {
        // console.log(response);

        if (response.statusCode === 201) {
          if (response?.data?.userId) {
            localStorage.setItem('clientID', response?.data?.userId);
            this.clientID = response?.data?.userId;
          }

          if (response?.data?.form) {
            const responseForm = response?.data?.form;
            const form: Form = responseForm;
            this.form = responseForm;
            if (form.inputs) {
              this.inputs = responseForm.inputs;

              const inputsValues = form?.inputs?.map((input: any) => {
                return {
                  ...input,
                  value:
                    input?.values && input?.values?.length > 0
                      ? input?.values[0]?.value
                      : undefined,
                  canEdit:
                    input?.values && input?.values?.length > 0
                      ? input?.values[0]?.canEdit
                      : undefined,
                };
              });

              if (!inputsValues.every((input) => !input.value)) {
                this.defaultValues = inputsValues;
              }

              // this.defaultValues = form?.inputs?.map((input: any) => {
              //   return {
              //     ...input,
              //     value: input?.values[0]?.value,
              //     canEdit: input?.values[0]?.canEdit,
              //   };
              // });
            }
            this.workflow = responseForm?.workflow;
          }
        }
      },
      error: (error: any) => {},
      complete: () => {},
    });
  }

  onPrevious(data: any) {
    if (!this.clientID) return;
    this.registerService
      .getPreviousRegisterForm(this.clientID, this.form._id)
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.statusCode === 200) {
            const form: Form = response.data;
            if (form.inputs) {
              this.inputs = form.inputs;
            }
            this.workflow = form?.workflow;
            this.form = form;
            if (form?.inputs) {
              this.defaultValues = form?.inputs?.map((input: any) => {
                return {
                  ...input,
                  value: input?.values[0]?.value,
                  canEdit: input?.values[0]?.canEdit,
                };
              });
            }
          }
        },
        error: (error: any) => {},
        complete: () => {},
      });
  }
}
