import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupervisorsComponent } from './admin-supervisors.component';

describe('AdminSupervisorsComponent', () => {
  let component: AdminSupervisorsComponent;
  let fixture: ComponentFixture<AdminSupervisorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSupervisorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupervisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
