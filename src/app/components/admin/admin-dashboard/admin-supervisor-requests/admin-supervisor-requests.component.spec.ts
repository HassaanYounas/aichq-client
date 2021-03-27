import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupervisorRequestsComponent } from './admin-supervisor-requests.component';

describe('AdminSupervisorRequestsComponent', () => {
  let component: AdminSupervisorRequestsComponent;
  let fixture: ComponentFixture<AdminSupervisorRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSupervisorRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupervisorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
