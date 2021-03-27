import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectIdeasComponent } from './admin-project-ideas.component';

describe('AdminProjectIdeasComponent', () => {
  let component: AdminProjectIdeasComponent;
  let fixture: ComponentFixture<AdminProjectIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProjectIdeasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProjectIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
