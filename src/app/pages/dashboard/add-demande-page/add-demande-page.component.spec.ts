import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemandePageComponent } from './add-demande-page.component';

describe('AddDemandePageComponent', () => {
  let component: AddDemandePageComponent;
  let fixture: ComponentFixture<AddDemandePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDemandePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDemandePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
