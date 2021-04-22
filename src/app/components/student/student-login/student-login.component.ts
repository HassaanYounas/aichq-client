import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Batch } from 'src/app/models/batch.model';
import { Department } from 'src/app/models/department.model';
import { Program } from 'src/app/models/program.model';
import { Student } from 'src/app/models/student.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html'
})
export class StudentLoginComponent implements OnInit {

    batches: Batch[];
    students: Student[];
    departments: Department[];
    batchesToDisplayFilter: Batch[];

    programAddSelect: Program;
    departmentAddSelect: Department;

    loginForm: FormGroup;
    validLogin: Boolean = true;
    errorMessage: String = '';

    programAddSelectBoolean: Boolean = false;
    departmentAddSelectBoolean: Boolean = false;

    constructor(
        private api: ApiService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            Department: new FormControl('Department'),
            Program: new FormControl('Program'),
            Batch: new FormControl('Batch'),
            Username: new FormControl(''),
            Password: new FormControl(''),
        });
        this.fetchDepartments();
        this.fetchBatches();
    }

    onSubmit(formData: any): void {
        if (
            formData.Password === '' || 
            formData.Username === '' ||
            formData.Department === 'Department' ||
            formData.Program === 'Program' ||
            formData.Batch === 'Batch'
        ) {
            this.validLogin = false;
            this.errorMessage = 'Invalid input';
        } else {
            const body = {
                Department: formData.Department,
                Program: formData.Program,
                Session: formData.Batch.split('-')[0],
                Year: formData.Batch.split('-')[1],
                Username: formData.Username,
                Password: formData.Password
            };
            this.validLogin = true;
            this.spinner.show();
            this.api.loginGroup(body).subscribe(
                (res: any) => {
                if (res.token !== '') {
                    this.validLogin = true;
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('id', res._id);
                    localStorage.setItem('department', formData.Department);
                    localStorage.setItem('session', formData.Batch.split('-')[0]);
                    localStorage.setItem('year', formData.Batch.split('-')[1]);
                    localStorage.setItem('program', formData.Program);
                    localStorage.setItem('type', 'Student');
                    setTimeout(() => { 
                        this.spinner.hide();
                        this.router.navigate(['/']);
                    }, 1000);
                }
                }, (error: any) => { 
                setTimeout(() => { 
                    this.spinner.hide();
                    this.validLogin = false; 
                    this.errorMessage = error; 
                }, 1000);}
            );      
        }
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

    
    onDepartmentAddStudent(departmentOption: String) {
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

    onProgramAddStudent(programOption: String) {
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