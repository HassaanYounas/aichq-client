import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Batch } from 'src/app/models/batch.model';
import { Department } from 'src/app/models/department.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-fyp-batches',
  templateUrl: './admin-fyp-batches.component.html'
})
export class AdminFypBatchesComponent implements OnInit {

    batches: Batch[];
    departments: Department[];

    selectedDepartment: Department;
    departmentFilterSelect: Department;

    years: Number[];
    departmentSortAlternate: Number = 0;
    sessionSortAlternate: Number = 0;
    programSortAlternate: Number = 0;
    yearSortAlternate: Number = 0;
    
    validAddBatch: Boolean = true;
    noFilterBoolean: Boolean = true;
    departmentFilterBoolean: Boolean = false;
    programFilterBoolean: Boolean = false;
    selectedDepartmentBoolean: Boolean = false;
    departmentFilterSelectBoolean: Boolean = false;

    addBatchMessage: String = '';
    selectedFilterDepartment: String = '';
    selectedFilterDepartmentProgram: String = '';

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
            Department: new FormControl('All Departments'),
            Program: new FormControl('All Programs')
        });
        this.fetchDepartments();
        this.fetchBatches();
    }

    fetchDepartments() {
        this.api.loadDepartments();
        this.departments = this.api.getDepartments();
    }

    fetchBatches() {
        this.api.loadBatches();
        this.batches = this.api.getBatches();
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
                this.fetchBatches();
                setTimeout(() => {
                    this.batchFilterSelectForm.controls['All Departments'].setValue(formData.Department);
                    this.batchFilterSelectForm.controls['All Programs'].setValue(formData.Program);
                    this.onBatchFilterSelect(formData.Department);
                    this.onBatchFilterCompleteSelect(formData.Program);
                }, 1000);
            }, (error: any) => this.addBatchResponse(error));
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
        if (departmentOption === 'All Departments')
            this.setBatchFilters(true, false, false, '', '');
        else {
            for (let i = 0; i < this.departments.length; i++) {
                if (departmentOption === this.departments[i].Name) {
                    this.departmentFilterSelect = this.departments[i];
                    this.departmentFilterSelectBoolean = true;
                }
            }
            this.setBatchFilters(false, true, false, departmentOption, '');
        }
    }

    onBatchFilterCompleteSelect(programOption: String): void {
        if (programOption === 'All Programs')
            this.setBatchFilters(false, true, false, this.selectedFilterDepartment, '');
        else this.setBatchFilters(false, false, true, this.selectedFilterDepartment, programOption);
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

    setBatchFilters(
        noFilterBoolean: Boolean, 
        departmentFilterBoolean: Boolean,
        programFilterBoolean: Boolean,
        selectedFilterDepartment: String,
        selectedFilterDepartmentProgram: String
    ) {
        this.noFilterBoolean = noFilterBoolean;
        this.departmentFilterBoolean = departmentFilterBoolean;
        this.programFilterBoolean = programFilterBoolean;
        this.selectedFilterDepartment = selectedFilterDepartment;
        this.selectedFilterDepartmentProgram = selectedFilterDepartmentProgram;
    }

    sortByDepartment() {
        if (this.departmentSortAlternate === 1) {
            this.batches.sort((a, b) => (a.Department > b.Department) ? 1 : ((b.Department > a.Department) ? -1 : 0));
            this.departmentSortAlternate = 0;
        } else {
            this.batches.sort((a, b) => (a.Department < b.Department) ? 1 : ((b.Department < a.Department) ? -1 : 0));
            this.departmentSortAlternate = 1;
        }
    }

    sortBySession() {
        if (this.sessionSortAlternate === 1) {
            this.batches.sort((a, b) => (a.Session > b.Session) ? 1 : ((b.Session > a.Session) ? -1 : 0));
            this.sessionSortAlternate = 0;
        } else {
            this.batches.sort((a, b) => (a.Session < b.Session) ? 1 : ((b.Session < a.Session) ? -1 : 0));
            this.sessionSortAlternate = 1;
        }
    }

    sortByProgram() {
        if (this.programSortAlternate === 1) {
            this.batches.sort((a, b) => (a.Program > b.Program) ? 1 : ((b.Program > a.Program) ? -1 : 0));
            this.programSortAlternate = 0;
        } else {
            this.batches.sort((a, b) => (a.Program < b.Program) ? 1 : ((b.Program < a.Program) ? -1 : 0));
            this.programSortAlternate = 1;
        }
    }

    sortByYear() {
        if (this.yearSortAlternate === 1) {
            this.batches.sort((a, b) => (a.Year > b.Year) ? 1 : ((b.Year > a.Year) ? -1 : 0));
            this.yearSortAlternate = 0;
        } else {
            this.batches.sort((a, b) => (a.Year < b.Year) ? 1 : ((b.Year < a.Year) ? -1 : 0));
            this.yearSortAlternate = 1;
        }
    }
}