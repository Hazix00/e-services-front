import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Form,
  FormInput,
} from 'src/app/pages/account/registration/register/register.component';

const insert = (arr: any[], index: number, newItem: any) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
})
export class JsonFormComponent implements OnInit {
  //! Inputs
  @Input() form!: Form;
  @Input() loading: boolean = false;
  @Input() inputs: FormInput[] = [];
  @Input() defaultValues: any[] = [];
  @Output() onSubmit = new EventEmitter();
  @Output() onPrevious = new EventEmitter();

  //! STATE
  formGroup: FormGroup = this.formBuilder.group({});
  showNext: Boolean = false;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges(changes: any) {
    // console.log(changes);
    if (!changes.firstChange) {
      if (this.defaultValues.length < 1) {
        const passwordInput: FormInput | undefined = this.inputs.find(
          (input) => input.type === 'password'
        );
        // console.log(passwordInput);
        const passwordIndex = passwordInput
          ? this.inputs.indexOf(passwordInput)
          : -1;

        if (passwordIndex > -1 && passwordInput) {
          const passwordConfirmInput: FormInput = {
            ...passwordInput,
            _id: passwordInput._id + '_confirm',
            name: 'passwordConfirm',
            label: 'Confirm Password',
            type: passwordInput.type,
            values: [],
            validation: {
              ...passwordInput?.validation,
              required: true,
            },
          };
          this.inputs = [
            ...insert(this.inputs, passwordIndex + 1, passwordConfirmInput),
          ];
        }
      }

      this.createForm(this.inputs);
    }
  }

  createForm(inputs: FormInput[]): void {
    if (!inputs) return;
    inputs.forEach((input) => {
      const validation = input?.validation;
      const validators: any[] = [];

      Object.entries(validation || []).forEach(([key, value]) => {
        switch (key) {
          case 'required':
            validators.push(Validators.required);
            break;
          case 'minLength':
            validators.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validators.push(Validators.maxLength(value));
            break;
          case 'min':
            validators.push(Validators.min(value));
            break;
          case 'max':
            validators.push(Validators.max(value));
            break;
          case 'pattern':
            validators.push(Validators.pattern(value));
            break;

          default:
            break;
        }
      });

      this.formGroup.addControl(
        input._id,
        this.formBuilder.control(input?.value, validators)
      );

      if (this.defaultValues.length > 0) {
        this.showNext = this.defaultValues.every((value) => !value?.canEdit);
        const defaultValue = this.defaultValues.find(
          (value) => value?._id === input._id
        );

        if (defaultValue) {
          this.formGroup.controls[input._id].setValue(defaultValue.value);
        }
        if (defaultValue && !defaultValue?.canEdit) {
          this.formGroup.controls[input._id].disable();
        }
      }
    });
  }

  submit() {
    if (this.formGroup.valid) {
      // console.log('submit', this.formGroup.value);
      this.onSubmit.emit(this.formGroup.value);
    } else {
      console.log(this.formGroup.value);
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  goNext() {
    this.onSubmit.emit(this.formGroup.value);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'text':
        return 'person';
      case 'email':
        return 'email';
      case 'tel':
        return 'phone';
      case 'password':
        return 'lock';
      default:
        return '';
    }
  }

  goPrev() {
    this.onPrevious.emit(this.formGroup.value);
  }
}
