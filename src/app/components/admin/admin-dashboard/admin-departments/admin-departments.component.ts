import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Department } from 'src/app/models/department.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-departments',
  templateUrl: './admin-departments.component.html'
})
export class AdminDepartmentsComponent implements OnInit {

    departments: Department[];

    addProgramMessage: String = '';
    addDepartmentMessage: String = '';

    addDepartmentForm: FormGroup;
    addProgramForm: FormGroup;

    constructor(
        private api: ApiService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.addDepartmentForm = new FormGroup({
            Name: new FormControl('')
        });
        this.addProgramForm = new FormGroup({
            Department: new FormControl(''),
            Title: new FormControl('')
        });
        this.fetchDepartments();
    }

    fetchDepartments() {
        this.api.loadDepartments();
        this.departments = this.api.getDepartments();
    }

    onAddDepartmentSubmit(formData: any) {
        if (formData.Name !== '') {
            this.spinner.show();
            this.api.addDepartment(formData).subscribe(
                (res: any) => {
                    this.addDepartmentResponse('Department added successfully.');
                    this.addDepartmentForm.controls['Name'].setValue('');
                    this.fetchDepartments();
                }, (error: any) => this.addDepartmentResponse(error)
            );
            setTimeout(() => this.addDepartmentMessage = '', 4000);
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
}
