import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesCategoriesComponent } from './demandes-categories.component';

describe('DemandesCategoriesComponent', () => {
  let component: DemandesCategoriesComponent;
  let fixture: ComponentFixture<DemandesCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
