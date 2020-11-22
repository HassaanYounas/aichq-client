import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegPendingComponent } from './student-reg-pending.component';

describe('StudentRegPendingComponent', () => {
  let component: StudentRegPendingComponent;
  let fixture: ComponentFixture<StudentRegPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRegPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
