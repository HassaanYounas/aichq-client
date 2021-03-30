import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Department } from 'src/app/models/department.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html'
})
export class SuperAdminComponent implements OnInit {

    departments: Department[];

    updateMessage: String = '';
    confirmationCode: String = '';
    addProgramMessage: String = '';
    addDepartmentMessage: String = '';

    invalidUpdate: Boolean = false;
    invalidAddProgram: Boolean = false;
    showSettingsBoolean: Boolean = false;
    invalidAddDepartment: Boolean = false;

    settingsForm: FormGroup;
    addProgramForm: FormGroup;
    confirmationForm: FormGroup;
    addDepartmentForm: FormGroup;

    constructor(
        private api: ApiService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private validation: InputValidationService
    ) { 
        if (localStorage.getItem('type') === 'Student') this.router.navigate(['/student/dashboard']);
        else if (localStorage.getItem('type') === 'Administrator') this.router.navigate(['/admin/dashboard']);
        else if (localStorage.getItem('type') === 'Supervisor') this.router.navigate(['/supervisor/dashboard']);
    }

    ngOnInit(): void {
        this.addDepartmentForm = new FormGroup({
            FullName: new FormControl(''),
            Email: new FormControl(''),
            Department: new FormControl(''),
            Code: new FormControl('')
        });
        this.addProgramForm = new FormGroup({
            Department: new FormControl(''),
            Title: new FormControl(''),
            Code: new FormControl('')
        });
        this.settingsForm = new FormGroup({
            Username: new FormControl(localStorage.getItem('username')),
            Password: new FormControl(''),
            Code: new FormControl('')
        });
        this.fetchDepartments();
        this.confirmationCode = this.generateCode(5);
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
            formData.FullName !== '' && this.validation.isName(formData.FullName) &&
            formData.Email !== '' && this.validation.isEmail(formData.Email) &&
            formData.Department !== '' && formData.Code === this.confirmationCode
        ) {
            this.invalidAddDepartment = false;
            this.spinner.show();
            this.api.addDepartment({ 
                FullName: formData.FullName,
                Email: formData.Email,
                Password: "123456789",
                Department: formData.Department
            }).subscribe(
                (res: any) => {
                    this.addDepartmentForm.controls['Department'].setValue('');
                    this.addDepartmentForm.controls['FullName'].setValue('');
                    this.addDepartmentForm.controls['Email'].setValue('');
                    this.addProgramForm.controls['Code'].setValue('');
                    this.fetchDepartments();
                    this.confirmationCode = this.generateCode(5);
                    this.addDepartmentResponse('Department added successfully.');
                    setTimeout(() => this.addDepartmentMessage = '', 4000);
                }, (error: any) => this.addDepartmentResponse(error)
            ); 
        } else this.invalidAddDepartment = true;
    }

    addDepartmentResponse(message: String): void {
        setTimeout(() => { 
            this.spinner.hide();
            this.addDepartmentMessage = message;
        }, 1000);
    }

    onAddProgramSubmit(formData: any) {
        if (
            formData.Department !== 'Department' && 
            formData.Department !== '' &&
            formData.Title !== '' &&
            formData.Code === this.confirmationCode
        ) {
            this.invalidAddProgram = false;
            this.spinner.show();
            this.api.addProgram(formData).subscribe(
                (res: any) => {
                    this.addProgramForm.controls['Department'].setValue('Department');
                    this.addProgramForm.controls['Title'].setValue('');
                    this.addProgramForm.controls['Code'].setValue('');
                    this.fetchDepartments();
                    this.addProgramResponse('Program added successfully.');
                    this.confirmationCode = this.generateCode(5);
                    setTimeout(() => this.addProgramMessage = '', 4000);
                }, (error: any) => this.addProgramResponse(error)
            ); 
        } else this.invalidAddProgram = true;
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

    showSettings(value: Boolean) {
        this.showSettingsBoolean = value;
    }

    generateCode(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        } return result;
    }

    onUpdateSubmit(formData: any) {
        if (
            formData.Username !== '' && 
            formData.Password !== '' &&
            formData.Code === this.confirmationCode
        ) {
            this.invalidUpdate = false;
            this.spinner.show();
            this.api.updateSuperAdmin({
                Username: formData.Username,
                Password: formData.Password
            }).subscribe(
                (res: any) => {
                    if (res.token !== '') {
                        localStorage.setItem('username', res.Username);
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('id', res._id);
                        localStorage.setItem('type', 'Super Administrator');
                        this.settingsForm.controls['Username'].setValue(localStorage.getItem('username'));
                        this.settingsForm.controls['Password'].setValue('');
                        this.settingsForm.controls['Code'].setValue('');
                        this.confirmationCode = this.generateCode(5);
                        this.updateResponse('Update successful.');
                        setTimeout(() => this.updateMessage = '', 4000);
                    }
                }, (error: any) => this.updateResponse(error)
            );
        } else this.invalidUpdate = true;
    }

    updateResponse(message: String): void {
        setTimeout(() => { 
            this.spinner.hide();
            this.updateMessage = message;
        }, 1000);
    }
}