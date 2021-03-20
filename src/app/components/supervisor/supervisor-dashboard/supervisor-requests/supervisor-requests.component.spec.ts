import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorRequestsComponent } from './supervisor-requests.component';

describe('SupervisorRequestsComponent', () => {
  let component: SupervisorRequestsComponent;
  let fixture: ComponentFixture<SupervisorRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
