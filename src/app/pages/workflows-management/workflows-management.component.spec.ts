import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsManagementComponent } from './workflows-management.component';

describe('WorkflowsManagementComponent', () => {
  let component: WorkflowsManagementComponent;
  let fixture: ComponentFixture<WorkflowsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
