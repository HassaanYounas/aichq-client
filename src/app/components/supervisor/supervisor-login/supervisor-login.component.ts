import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Department } from 'src/app/models/department.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-supervisor-login',
  templateUrl: './supervisor-login.component.html'
})
export class SupervisorLoginComponent implements OnInit {

    departments: Department[];

    loginForm: FormGroup;
    validLogin: Boolean = true;
    errorMessage: String = '';

    constructor(
        private validate: InputValidationService,
        private api: ApiService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            Department: new FormControl('Department'),
            Email: new FormControl(''),
            Password: new FormControl(''),
        });
        this.fetchDepartments();
    }

    fetchDepartments() {
        this.api.loadDepartments().subscribe(
            (res: any) => {
                this.departments = new Array<Department>();
                res.forEach(e => this.departments.push(new Department(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    onSubmit(formData: any): void {
        if (
            formData.Department !== 'Department' &&
            this.validate.isEmail(formData.Email)  &&
            formData.Password !== ''
        ) {
            this.spinner.show();
            this.api.loginSupervisor(formData).subscribe(
                (res: any) => {
                    if (res.token !== '') {
                        this.validLogin = true;
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('type', 'Supervisor');
                        localStorage.setItem('fullName', res.FullName);
                        localStorage.setItem('email', res.Email);
                        localStorage.setItem('designation', res.Designation);
                        localStorage.setItem('department', formData.Department);
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
        } else {
            this.validLogin = false;
            this.errorMessage = 'Invaid input.';
        }
    }
}
