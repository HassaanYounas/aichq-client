import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Department } from 'src/app/models/department.model';
import { Supervisor } from 'src/app/models/supervisor.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { DOCUMENT } from '@angular/common'; 

declare const $: any;

@Component({
  selector: 'app-admin-supervisors',
  templateUrl: './admin-supervisors.component.html'
})
export class AdminSupervisorsComponent implements OnInit {

    supervisorsCSV: File = null;

    departments: Department[];
    supervisors: Supervisor[];

    addSupervisorForm: FormGroup;
    addSupervisorBulkForm: FormGroup;
    departmentSelectForm: FormGroup;

    fileUploaded: Boolean = false;
    noFilterBoolean: Boolean = true;
    validAddSupervisor: Boolean = true;
    validAddSupervisorBulk: Boolean = true;

    activeToggleText: String = '';
    addSupervisorMessage: String = '';
    addSupervisorBulkMessage: String = '';
    selectedFilterDepartment: String = '';

    currentSupervisorIndex: number = 0;
    nameSortAlternate: Number = 0;
    emailSortAlternate: Number = 0;
    activeSortAlternate: Number = 0;
    departmentSortAlternate: Number = 0;
    designationSortAlternate: Number = 0;

    constructor(
        private api: ApiService,
        private validate: InputValidationService,
        private spinner: NgxSpinnerService,
        private ngxCsvParser: NgxCsvParser,
        @Inject(DOCUMENT) document
    ) { }

    ngOnInit(): void {
        $('.custom-file-input').on('change', function() {
            let fileName = $(this).val().split('\\').pop();
            $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
        });
        this.addSupervisorForm = new FormGroup({
            Title: new FormControl('Title'),
            FullName: new FormControl(''),
            Email: new FormControl(''),
            Designation: new FormControl('Designation'),
            Department: new FormControl(localStorage.getItem('department')),
        });
        this.addSupervisorBulkForm = new FormGroup({
            Department: new FormControl(localStorage.getItem('department'))
        });
        this.fetchSupervisors();
    }

    fetchSupervisors() {
        this.api.loadSupervisors({ Department: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.supervisors = new Array<Supervisor>();
                res.forEach(e => this.supervisors.push(new Supervisor(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    onAddSupervisorFormSubmit(formData: any): void {
        if (
            formData.Title !== 'Title' && 
            formData.Department !== 'Department' && 
            formData.Designation !== 'Designation' &&
            this.validate.isAlphabetsOnly(formData.FullName) &&
            this.validate.isEmail(formData.Email)
        ) {
            this.validAddSupervisor = true;
            this.spinner.show();
            const body = {
                FullName: formData.Title + ' ' + formData.FullName,
                Email: formData.Email,
                Department: formData.Department,
                Designation: formData.Designation
            }
            this.api.addSupervisor(body).subscribe(
                (res: any) => {
                    this.addSupervisorResponse('Supervisor added successfully.');
                    this.addSupervisorForm.controls['Title'].setValue('Title');
                    this.addSupervisorForm.controls['FullName'].setValue('');
                    this.addSupervisorForm.controls['Email'].setValue('');
                    this.addSupervisorForm.controls['Designation'].setValue('Designation');
                    this.addSupervisorForm.controls['Department'].setValue(localStorage.getItem('department'));
                    this.fetchSupervisors();
                }, (error: any) => this.addSupervisorResponse(error)
            ); setTimeout(() => this.addSupervisorMessage = '', 4000);
        } else this.validAddSupervisor = false;
    }

    resetActiveToggle() {
        const toggleActive = document.getElementById('customSwitch' + this.currentSupervisorIndex.toString()) as HTMLInputElement
        toggleActive.checked = this.supervisors[this.currentSupervisorIndex].Active.valueOf();
    }

    toggleSupervisorActive() {
        if (this.supervisors[this.currentSupervisorIndex].Active) {
            this.api.setSupervisorInactive({ 
                Department: localStorage.getItem('department'),
                Email: this.supervisors[this.currentSupervisorIndex].Email 
            }).subscribe(
                (res: any) => {
                    this.fetchSupervisors();
                }, (error: any) => console.log(error)
            ); 
        } else {
            this.api.setSupervisorActive({ 
                Department: localStorage.getItem('department'),
                Email: this.supervisors[this.currentSupervisorIndex].Email 
            }).subscribe(
                (res: any) => {
                    this.fetchSupervisors();
                }, (error: any) => console.log(error)
            ); 
        }
    }

    clickActiveToggle(index: number, active: boolean) {
        this.currentSupervisorIndex = index;
        if (active) this.activeToggleText = 'Do you want to set supervisor as inactive?';
        else this.activeToggleText = 'Do you want to set supervisor as active?';
    }

    addSupervisorResponse(message: String): void {
        setTimeout(() => { 
        this.spinner.hide();
        this.addSupervisorMessage = message;
        }, 1000);
    }

    onAddSupervisorBulkFormSubmit(formData: any): void {
        if (!this.fileUploaded) this.validAddSupervisorBulk = false;
        else {
            this.validAddSupervisorBulk = true;
            this.ngxCsvParser.parse(this.supervisorsCSV, { header: true, delimiter: ',' })
                .pipe().subscribe((result: Array<any>) => {
                    const body = [];
                    for (let i = 0; i < result.length; i++) {
                        if (
                            'FullName' in result[i] &&
                            'Email' in result[i] &&
                            'Designation' in result[i]
                        ) {
                            body.push({
                                FullName: result[i].FullName,
                                Email: result[i].Email,
                                Department: formData.Department,
                                Designation: result[i].Designation
                            });
                        } else {
                            this.validAddSupervisorBulk = false;
                            return;
                        }
                    }
                    this.spinner.show();
                    this.api.addSupervisorsBulk(body).subscribe(
                        (res: any) => {
                            this.addSupervisorsBulkResponse('Supervisors uploaded successfully.');
                            this.fetchSupervisors();
                        }, (error: any) => this.addSupervisorsBulkResponse(error)
                    );
                }, (error: NgxCSVParserError) => this.validAddSupervisorBulk = false);
            setTimeout(() => this.addSupervisorBulkMessage = '', 4000);
        }
    }

    addSupervisorsBulkResponse(message: String): void {
        setTimeout(() => { 
            this.spinner.hide();
            this.addSupervisorBulkMessage = message;
        }, 1000);
    }

    handleFileInput(files: FileList): void { 
        this.supervisorsCSV = files[0];
        this.fileUploaded = true;
    }

    sortByDesignation() {
        if (this.designationSortAlternate === 1) {
            this.supervisors.sort((a, b) => (a.Designation > b.Designation) ? 1 : ((b.Designation > a.Designation) ? -1 : 0));
            this.designationSortAlternate = 0;
        } else {
            this.supervisors.sort((a, b) => (a.Designation < b.Designation) ? 1 : ((b.Designation < a.Designation) ? -1 : 0));
            this.designationSortAlternate = 1;
        }
    }

    sortByActive() {
        if (this.activeSortAlternate === 1) {
            this.supervisors.sort((a, b) => (a.Active > b.Active) ? 1 : ((b.Active > a.Active) ? -1 : 0));
            this.activeSortAlternate = 0;
        } else {
            this.supervisors.sort((a, b) => (a.Active < b.Active) ? 1 : ((b.Active < a.Active) ? -1 : 0));
            this.activeSortAlternate = 1;
        }
    }

    sortByName() {
        if (this.nameSortAlternate === 1) {
            this.supervisors.sort((a, b) => (a.FullName > b.FullName) ? 1 : ((b.FullName > a.FullName) ? -1 : 0));
            this.nameSortAlternate = 0;
        } else {
            this.supervisors.sort((a, b) => (a.FullName < b.FullName) ? 1 : ((b.FullName < a.FullName) ? -1 : 0));
            this.nameSortAlternate = 1;
        }
    }

    sortByEmail() {
        if (this.emailSortAlternate === 1) {
            this.supervisors.sort((a, b) => (a.Email > b.Email) ? 1 : ((b.Email > a.Email) ? -1 : 0));
            this.emailSortAlternate = 0;
        } else {
            this.supervisors.sort((a, b) => (a.Email < b.Email) ? 1 : ((b.Email < a.Email) ? -1 : 0));
            this.emailSortAlternate = 1;
        }
    }
}