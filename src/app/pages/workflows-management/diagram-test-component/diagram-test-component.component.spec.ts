import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramTestComponentComponent } from './diagram-test-component.component';

describe('DiagramTestComponentComponent', () => {
  let component: DiagramTestComponentComponent;
  let fixture: ComponentFixture<DiagramTestComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramTestComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramTestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
