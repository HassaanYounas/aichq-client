import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Department } from 'src/app/models/department.model';
import { Program } from 'src/app/models/program.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html'
})
export class AdminStudentsComponent implements OnInit {

  @Input() departments: Department[];

  departmentFilterSelect: Department;
  departmentAddSelect: Department;
  programFilterSelect: Program;
  programAddSelect: Program;

  addStudentForm: FormGroup;
  studentFilterSelectForm: FormGroup;

  departmentFilterSelectBoolean: Boolean = false;
  departmentAddSelectBoolean: Boolean = false;
  programFilterSelectBoolean: Boolean = false;
  programAddSelectBoolean: Boolean = false;
  validAddStudent: Boolean = true;
  currentStudentsText: String = 'Select above options:';
  addStudentMessage: String = '';

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private validate: InputValidationService
  ) { }

  ngOnInit(): void {
    this.addStudentForm = new FormGroup({
      FullName: new FormControl(''),
      RollNumber: new FormControl(''),
      Department: new FormControl('Department'),
      Program: new FormControl('Program'),
      Batch: new FormControl('Batch')
    });
    this.studentFilterSelectForm = new FormGroup({
      Department: new FormControl('Department'),
      Program: new FormControl('Program'),
      Batch: new FormControl('Batch')
    });
  }

  onAddStudentFormSubmit(formData: any): void {
    if (
      this.validate.isAlphabetsOnly(formData.FullName) && 
      formData.RollNumber !== 0 &&
      formData.Department !== 'Department' &&  
      formData.Program !== 'Program' &&  
      formData.Batch !== 'Batch'  
    ) {
      this.spinner.show();
      this.api.addStudent({
        Department: formData.Department,
        Program: formData.Program,
        Session: formData.Batch.split('-')[0],
        Year: formData.Batch.split('-')[1],
        FullName: formData.FullName,
        RollNumber: formData.RollNumber.toString()
      }).subscribe(
        (res: any) => {
          this.addStudentResponse('Student added successfully.');
          this.addStudentForm.controls['Batch'].setValue('Batch');
          this.addStudentForm.controls['Department'].setValue('Department');
          this.addStudentForm.controls['Program'].setValue('Program');
          this.addStudentForm.controls['FullName'].setValue('');
          this.addStudentForm.controls['RollNumber'].setValue('');
          // this.updateBatches.emit(true);
        }, (error: any) => this.addStudentResponse(error)
      );
      this.validAddStudent = true;
      setTimeout(() => this.addStudentMessage = '', 4000);
    } else this.validAddStudent = false;
  }

  addStudentResponse(message: String): void {
    setTimeout(() => { 
      this.spinner.hide();
      this.addStudentMessage = message;
    }, 1000);
  }

  onDepartmentAddStudent(departmentOption: String): void {
    if (departmentOption === 'Department') this.departmentAddSelectBoolean = false;
    else {
      for (let i = 0; i < this.departments.length; i++) {
        if (departmentOption === this.departments[i].Name) {
          this.departmentAddSelect = this.departments[i];
          this.departmentAddSelectBoolean = true;
        }
      }
    }
  }

  
  onProgramAddStudent(programOption: String): void {
    if (programOption === 'Program') this.programAddSelectBoolean = false;
    else {
      for (let i = 0; i < this.departmentAddSelect.Programs.length; i++) {
        if (programOption === this.departmentAddSelect.Programs[i].Title) {
          this.programAddSelect = this.departmentAddSelect.Programs[i];
          this.programAddSelectBoolean = true;
        }
      }
    }
  }

  
  onBatchAddStudent(departmentOption: String): void {
    
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
      this.currentStudentsText = `Students of ${this.departmentFilterSelect.Name} department (${this.programFilterSelect.Title} ${batchOption}):`;
    }
  }
}