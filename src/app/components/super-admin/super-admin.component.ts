import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Department } from 'src/app/models/department.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html'
})
export class SuperAdminComponent implements OnInit {

    departments: Department[];

    addProgramMessage: String = '';
    addDepartmentMessage: String = '';

    addDepartmentForm: FormGroup;
    addProgramForm: FormGroup;

    constructor(
        private api: ApiService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) { 
        if (localStorage.getItem('type') === 'Student') this.router.navigate(['/student/dashboard']);
        else if (localStorage.getItem('type') === 'Administrator') this.router.navigate(['/admin/dashboard']);
        else if (localStorage.getItem('type') === 'Supervisor') this.router.navigate(['/supervisor/dashboard']);
    }

    ngOnInit(): void {
        this.addDepartmentForm = new FormGroup({
            FullName: new FormControl(''),
            Email: new FormControl(''),
            Department: new FormControl('')
        });
        this.addProgramForm = new FormGroup({
            Department: new FormControl(''),
            Title: new FormControl('')
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

    onAddDepartmentSubmit(formData: any) {
        if (
            formData.FullName !== '' ||
            formData.Email !== '' ||
            formData.Department !== ''
        ) {
            this.spinner.show();
            this.api.addDepartment({ Name: formData.Department }).subscribe(
                (res: any) => {
                    this.api.createAdmin({
                        FullName: formData.FullName,
                        Email: formData.Email,
                        Password: "123456789",
                        Department: formData.Department
                    }).subscribe(
                        (res: any) => {
                            this.addDepartmentResponse('Department added successfully.');
                            this.addDepartmentForm.controls['Department'].setValue('');
                            this.addDepartmentForm.controls['FullName'].setValue('');
                            this.addDepartmentForm.controls['Email'].setValue('');
                            this.fetchDepartments();
                        }, (error: any) => this.addDepartmentResponse(error)
                    );
                }, (error: any) => this.addDepartmentResponse(error)
            ); setTimeout(() => this.addDepartmentMessage = '', 4000);
        }
    }

    addDepartmentResponse(message: String): void {
        setTimeout(() => { 
            this.spinner.hide();
            this.addDepartmentMessage = message;
        }, 1000);
    }

    onAddProgramSubmit(formData: any) {
        if (formData.Department !== 'Department' && formData.Title !== '') {
            this.spinner.show();
            this.api.addProgram(formData).subscribe(
                (res: any) => {
                    this.addProgramResponse('Program added successfully.');
                    this.addProgramForm.controls['Department'].setValue('Department');
                    this.addProgramForm.controls['Title'].setValue('');
                    this.fetchDepartments();
                }, (error: any) => this.addProgramResponse(error)
            );
            setTimeout(() => this.addProgramMessage = '', 4000);
        }
    }

    addProgramResponse(message: String): void {
        setTimeout(() => { 
            this.spinner.hide();
            this.addProgramMessage = message;
        }, 1000);
    }

    signOut() {
        localStorage.clear();
        this.router.navigate(['/super/admin/login']);
    }
}