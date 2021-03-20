import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Batch } from 'src/app/models/batch.model';
import { Department } from 'src/app/models/department.model';
import { Program } from 'src/app/models/program.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-student-reg',
  templateUrl: './student-reg.component.html'
})
export class StudentRegComponent implements OnInit {

    batches: Batch[];
    departments: Department[];
    batchesToDisplayFilter: Batch[];

    departmentAddSelect: Department;
    programAddSelect: Program;

    departmentFilterSelectBoolean: Boolean = false;
    departmentAddSelectBoolean: Boolean = false;
    programFilterSelectBoolean: Boolean = false;
    programAddSelectBoolean: Boolean = false;
    validAddStudent: Boolean = true;
    currentStudentsText: String = 'Select above options:';

    registrationForm: FormGroup;

    validStudentInfo: Boolean = true;
    validBatch: Boolean = true;
    validUsername: Boolean = true;
    validPassword: Boolean = true;
    validPasswordConfirm: Boolean = true;
    invalidRegistration: Boolean = false;
    validRegistration: Boolean = false;
    errorMessage: String = '';
    successMessage: String = '';

    constructor(
        private api: ApiService,
        private validate: InputValidationService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.registrationForm = new FormGroup({
        StudentOneName: new FormControl(''),
        StudentOneRollNumber: new FormControl(''),
        StudentTwoName: new FormControl(''),
        StudentTwoRollNumber: new FormControl(''),
        Department: new FormControl('Department'),
        Program: new FormControl('Program'),
        Batch: new FormControl('Batch'),
        Username: new FormControl(''),
        Password: new FormControl('')
        });
        this.fetchDepartments();
        this.fetchBatches();
    }

    fetchDepartments() {
        this.api.loadDepartments().subscribe(
            (res: any) => {
                this.departments = new Array<Department>();
                res.forEach(e => this.departments.push(new Department(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    fetchBatches() {
        this.api.loadBatches({}).subscribe(
            (res: any) => {
                this.batches = new Array<Batch>();
                res.forEach(e => this.batches.push(new Batch(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    onSubmit(formData: any): void {
        if (
            (this.validate.isAlphabetsOnly(formData.StudentOneName)) &&
            (formData.StudentOneRollNumber !== 0 || formData.StudentOneRollNumber !== '') &&
            (this.validate.isAlphabetsOnly(formData.StudentTwoName)) &&
            (formData.StudentTwoRollNumber !== 0 || formData.StudentTwoRollNumber !== '')
        ) this.validStudentInfo = true;
        else this.validStudentInfo = false;
        if (formData.Batch === 'Batch') this.validBatch = false;
        else this.validBatch = true;
        if (!this.validate.isAlphabetsAndNumbersOnly(formData.Username) || formData.Username === '') this.validUsername = false;
        else this.validUsername = true;
        if (formData.Password.length < 8) this.validPassword = false;
        else this.validPassword = true;
        if (this.validStudentInfo && this.validBatch && this.validUsername && this.validPassword) {
        if (formData.StudentOneRollNumber === formData.StudentTwoRollNumber) {
            this.invalidRegistration = true;
            this.errorMessage = 'Roll numbers cannot be same.';
        } else {
            const batch = formData.Batch.split('-');
            const body = {
            Department: formData.Department,
            Program: formData.Program,
            Session: batch[0],
            Year: batch[1],
            Username: formData.Username,
            Password: formData.Password,
            StudentOne: {
                FullName: formData.StudentOneName,
                RollNumber: formData.StudentOneRollNumber.toString(),
                Email: formData.StudentOneRollNumber + '@students.au.edu.pk'
            },
            StudentTwo: {
                FullName: formData.StudentTwoName,
                RollNumber: formData.StudentTwoRollNumber.toString(),
                Email: formData.StudentTwoRollNumber + '@students.au.edu.pk'
            }
            }
            this.spinner.show();
            this.api.registerGroup(body).subscribe(
            (res: any) => {
                if (res.token !== '') {
                this.errorMessage = ''; 
                this.invalidRegistration = false;
                setTimeout(() => { 
                    this.spinner.hide();
                    this.router.navigate(['/student/reg/pending']);
                }, 1000);
                }
            }, (error: any) => { 
                setTimeout(() => { 
                this.spinner.hide();
                this.invalidRegistration = true;
                this.errorMessage = error; 
                }, 1000); }
            );
        }
        }
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
                    this.batchesToDisplayFilter = new Array<Batch>();
                    this.batches.forEach(e => {
                        if (
                            this.departmentAddSelect.Name === e.Department &&
                            this.programAddSelect.Title === e.Program
                        ) this.batchesToDisplayFilter.push(new Batch(e));
                    });
                }
            }
        }
    }
}