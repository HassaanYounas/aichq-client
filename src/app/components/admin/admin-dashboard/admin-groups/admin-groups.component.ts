import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { Program } from 'src/app/models/program.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html'
})
export class AdminGroupsComponent implements OnInit {

  @Input() departments: Department[];

  departmentFilterSelect: Department;
  programFilterSelect: Program;

  groupFilterSelectForm: FormGroup;

  departmentFilterSelectBoolean: Boolean = false;
  programFilterSelectBoolean: Boolean = false;
  currentGroupsText: String = 'Select above options:';

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.groupFilterSelectForm = new FormGroup({
      Department: new FormControl('Department'),
      Program: new FormControl('Program'),
      Batch: new FormControl('Batch')
    });
  }

  onDepartmentSelectFilter(departmentOption: String): void {
    if (departmentOption === 'Department') this.departmentFilterSelectBoolean = false;
    else {
      for (let i = 0; i < this.departments.length; i++) {
        if (departmentOption === this.departments[i].Name) {
          this.departmentFilterSelect = this.departments[i];
          this.departmentFilterSelectBoolean = true;
        }
      }
    }
  }

  onProgramSelectFilter(programOption: String): void {
    if (programOption === 'Program') this.programFilterSelectBoolean = false;
    else {
      for (let i = 0; i < this.departmentFilterSelect.Programs.length; i++) {
        if (programOption === this.departmentFilterSelect.Programs[i].Title) {
          this.programFilterSelect = this.departmentFilterSelect.Programs[i];
          this.programFilterSelectBoolean = true;
        }
      }
    }
  }

  onBatchSelectFilter(batchOption: String): void {
    if (batchOption !== 'Batch') {
      this.currentGroupsText = `FYP Groups of ${this.departmentFilterSelect.Name} department (${this.programFilterSelect.Title} ${batchOption}):`;
    }
  }
}