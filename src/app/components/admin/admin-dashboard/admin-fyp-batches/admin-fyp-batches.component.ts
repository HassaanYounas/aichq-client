import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BatchView } from 'src/app/models/batch-view.model';
import { Department } from 'src/app/models/department.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-fyp-batches',
  templateUrl: './admin-fyp-batches.component.html'
})
export class AdminFypBatchesComponent implements OnInit {

  @Input() departments: Department[];
  @Output() updateData: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  batchView: BatchView[];
  selectedDepartment: Department;
  departmentFilterSelect: Department;

  years: Number[];
  validAddBatch: Boolean = true;
  selectedDepartmentBoolean: Boolean = false;
  departmentFilterSelectBoolean: Boolean = false;
  addBatchMessage: String = '';
  currentBatchesText: String = 'Select above options:';

  addBatchForm: FormGroup;
  batchFilterSelectForm: FormGroup;

  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    let year = new Date().getFullYear() - 5;
    this.years = new Array<Number>(8);
    for (let i = 0; i < 8; i++) this.years[i] = year++;
    this.addBatchForm = new FormGroup({
      Session: new FormControl('Session'),
      Year: new FormControl('Year'),
      Department: new FormControl('Department'),
      Program: new FormControl('Program')
    });
    this.batchFilterSelectForm = new FormGroup({
      Department: new FormControl('Department'),
      Program: new FormControl('Program')
    });
  }

  onAddBatchFormSubmit(formData: any): void {
    if (
      formData.Session !== 'Session' &&
      formData.Year !== 'Year' &&
      formData.Department !== 'Department' &&
      formData.Program !== 'Program'
    ) {
      this.spinner.show();
      this.api.addBatch(formData).subscribe(
        (res: any) => {
          this.addBatchResponse('Batch added successfully.');
          this.addBatchForm.controls['Session'].setValue('Session');
          this.addBatchForm.controls['Year'].setValue('Year');
          this.addBatchForm.controls['Department'].setValue('Department');
          this.addBatchForm.controls['Program'].setValue('Program');
          this.batchView = [];
          this.updateData.emit(true);
          setTimeout(() => {
            this.batchFilterSelectForm.controls['Department'].setValue(formData.Department);
            this.batchFilterSelectForm.controls['Program'].setValue(formData.Program);
            this.onBatchFilterSelect(formData.Department);
            this.onBatchFilterCompleteSelect(formData.Program);
          }, 1000);
        }, (error: any) => this.addBatchResponse(error)
      );
      this.validAddBatch = true;
      setTimeout(() => this.addBatchMessage = '', 4000);
    } else this.validAddBatch = false;
    setTimeout(() => this.validAddBatch = true, 3000);
  }

  addBatchResponse(message: String): void {
    setTimeout(() => { 
      this.spinner.hide();
      this.addBatchMessage = message;
    }, 1000);
  }

  onBatchFilterSelect(departmentOption: String): void {
    if (departmentOption === 'Department') this.departmentFilterSelectBoolean = false;
    else {
      for (let i = 0; i < this.departments.length; i++) {
        if (departmentOption === this.departments[i].Name) {
          this.departmentFilterSelect = this.departments[i];
          this.departmentFilterSelectBoolean = true;
        }
      }
    } this.currentBatchesText = 'Select above options:';
  }

  onBatchFilterCompleteSelect(programOption: String): void {
    if (programOption === 'Program') this.selectedDepartmentBoolean = false;
    else {
      this.currentBatchesText = 
        `Batches of ${this.departmentFilterSelect.Name} department (${programOption}):`;
      for (let i = 0; i < this.departments.length; i++) {
        if (this.departments[i].Name === this.departmentFilterSelect.Name) {
          for (let j = 0; j < this.departments[i].Programs.length; j++) {
            if (this.departments[i].Programs[j].Title === programOption) {
              this.batchView = new Array<BatchView>();
              for (let k = 0; k < this.departments[i].Programs[j].Batches.length; k++) {
                if (this.departments[i].Programs[j].Batches[k].Archived === false) {
                  this.batchView.push(new BatchView(
                    this.departments[i].Programs[j].Title,
                    this.departments[i].Programs[j].Batches[k].BatchID
                  ));
                }
              }
              this.batchView.sort((a, b) => {
                return (a.BatchID > b.BatchID) ? 1 : ((b.BatchID > a.BatchID) ? -1 : 0);
              });
            }
          }
        }
      }
    }
  }

  onDepartmentSelected(departmentOption: String): void {
    if (departmentOption === 'Department') this.selectedDepartmentBoolean = false;
    else {
      for (let i = 0; i < this.departments.length; i++) {
        if (departmentOption === this.departments[i].Name) {
          this.selectedDepartment = this.departments[i];
          this.selectedDepartmentBoolean = true;
        }
      }
    }
  }
}