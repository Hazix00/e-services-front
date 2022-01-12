import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Form,
  FormInput,
} from 'src/app/pages/account/registration/register/register.component';
import { FilesService } from 'src/app/services/files/files.service';
const insert = (arr: any[], index: number, newItem: any) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];
@Component({
  selector: 'app-json-form-v2',
  templateUrl: './json-form-v2.component.html',
  styleUrls: ['./json-form-v2.component.scss'],
})
export class JsonFormV2Component implements OnInit {
  //! Inputs
  @Input() form!: any;
  @Input() loading: boolean = true;
  @Input() inputs: any[] = [];
  @Input() showBtns = true;
  @Input() defaultValues: any[] = [];
  @Output() onSubmit = new EventEmitter();
  @Output() onPrevious = new EventEmitter();

  //! STATE
  formGroup: FormGroup = this.formBuilder.group({});
  showNext: Boolean = false;
  isUploading: Boolean = false;
  files: any = {};

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly filesService: FilesService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: any) {
    if (!changes.firstChange) {
      this.createForm(this.inputs);
    }
  }

  createForm(inputs: FormInput[]): void {
    if (!inputs) return;
    inputs.forEach((input, index) => {
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
      // console.log('this.defaultValues', this.defaultValues);
    });
  }

  submit() {
    if (this.formGroup.valid) {
      // console.log('submit', this.formGroup.value);
      this.onSubmit.emit(this.formGroup.value);
      // console.log('submit', this.formGroup.value);
      // console.log(this.formGroup.value, 'hello');
    } else {
      // console.log(this.formGroup.value);
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  goNext() {
    Object.entries(this.formGroup.value).forEach(([key, value]) => {
      if (this.files[key]) {
        this.formGroup.value[key] = this.files[key];
      }
    });
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
    console.log('goPrev');
    this.onPrevious.emit();
  }

  onCheckboxChange(event: any, childId: string, inputId?: string) {
    console.log(event, childId, inputId);
    if (!inputId) {
      this.formGroup.controls[childId].setValue(event.target.checked);
    } else {
      this.formGroup.controls[`${childId}_${inputId}`].setValue(
        event.target.checked
      );
    }
  }

  onFileSelected(event: any) {
    this.isUploading = true;
    this.filesService.uploadImage(event.target.files[0]).subscribe({
      next: (response) => {
        console.log(event.target.name);
        if (response?.data) {
          // this.formGroup.controls[event.target.name].setValue(
          //   event.target.files[0]
          // );
          this.files[event.target.name] = response.data;
          this.isUploading = false;
        }
      },
      error: (err) => {
        this.isUploading = false;
      },
      complete: () => {
        this.isUploading = false;
      },
    });
  }
}
