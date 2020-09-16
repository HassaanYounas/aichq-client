import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFypBatchesComponent } from './admin-fyp-batches.component';

describe('AdminFypBatchesComponent', () => {
  let component: AdminFypBatchesComponent;
  let fixture: ComponentFixture<AdminFypBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFypBatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFypBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
