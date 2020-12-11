import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorProposalsComponent } from './supervisor-proposals.component';

describe('SupervisorProposalsComponent', () => {
  let component: SupervisorProposalsComponent;
  let fixture: ComponentFixture<SupervisorProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorProposalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
