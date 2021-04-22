import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Batch } from 'src/app/models/batch.model';
import { Department } from 'src/app/models/department.model';
import { Program } from 'src/app/models/program.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-fyp-batches',
  templateUrl: './admin-fyp-batches.component.html'
})
export class AdminFypBatchesComponent implements OnInit {

    batches: Batch[];
    programs: Program[];

    years: Number[];
    yearSortAlternate: Number = 0;
    sessionSortAlternate: Number = 0;
    programSortAlternate: Number = 0;
    
    validAddBatch: Boolean = true;
    noFilterBoolean: Boolean = true;
    programFilterBoolean: Boolean = false;

    batchesListText: String = '';
    addBatchMessage: String = '';
    selectedProgram: String = 'All Programs';

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
            Department: new FormControl(localStorage.getItem('department')),
            Program: new FormControl('Program')
        });
        this.batchFilterSelectForm = new FormGroup({
            Program: new FormControl('All Programs')
        });
        this.fetchPrograms();
        this.fetchBatches();
        this.batchesListText = `FYP Batches in ${localStorage.getItem('department')} Department`;
    }

    fetchPrograms() {
        this.api.loadPrograms({ Name: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.programs = new Array<Program>();
                res.forEach(e => this.programs.push(new Program(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    fetchBatches() {
        this.api.loadBatches({ Department: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.batches = new Array<Batch>();
                res.forEach(e => this.batches.push(new Batch(e)));
                this.programs.forEach(e => {
                    let count = 0;
                    this.batches.forEach(b => {
                        if (b.Program === e.Title) count++;
                    });
                    e.NumberOfBatches = count;
                });
            }, (error: any) => { console.log(error); }
        );
    }

    onAddBatchFormSubmit(formData: any): void {
        if (
            formData.Session !== 'Session' &&
            formData.Year !== 'Year' &&
            formData.Program !== 'Program'
        ) {
            this.spinner.show();
            this.api.addBatch(formData).subscribe(
                (res: any) => {
                    this.addBatchResponse('Batch added successfully.');
                    this.addBatchForm.controls['Session'].setValue('Session');
                    this.addBatchForm.controls['Year'].setValue('Year');
                    this.addBatchForm.controls['Program'].setValue('Program');
                    this.batchFilterSelectForm.controls['Program'].setValue(formData.Program);
                    this.setBatchFilters(false, true, formData.Program);
                    this.fetchBatches();
                }, 
                (error: any) => this.addBatchResponse(error)
            );
            this.validAddBatch = true;
            setTimeout(() => this.addBatchMessage = '', 4000);
            setTimeout(() => this.validAddBatch = true, 3000);
        } else this.validAddBatch = false;
    }

    addBatchResponse(message: String): void {
        setTimeout(() => { 
            this.spinner.hide();
            this.addBatchMessage = message;
        }, 1000);
    }

    onProgramFilterSelection(programOption: String): void {
        if (programOption === 'All Programs') {
            this.setBatchFilters(true, false, 'All Programs');
        } else this.setBatchFilters(false, true, programOption);
    }

    setBatchFilters(
        noFilterBoolean: Boolean, 
        programFilterBoolean: Boolean,
        selectedProgram: String
    ) {
        this.noFilterBoolean = noFilterBoolean;
        this.programFilterBoolean = programFilterBoolean;
        this.selectedProgram = selectedProgram;
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