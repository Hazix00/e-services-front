import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFormV2Component } from './json-form-v2.component';

describe('JsonFormV2Component', () => {
  let component: JsonFormV2Component;
  let fixture: ComponentFixture<JsonFormV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonFormV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonFormV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
