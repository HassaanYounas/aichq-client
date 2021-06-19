import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Batch } from 'src/app/models/batch.model';
import { Department } from 'src/app/models/department.model';
import { Group } from 'src/app/models/group.model';
import { Program } from 'src/app/models/program.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html'
})
export class AdminGroupsComponent implements OnInit {

    groups: Group[];
    batches: Batch[];
    programs: Program[];

    batchesToDisplayFilter: Batch[];

    groupFilterSelectForm: FormGroup;

    programFilterSelectBoolean: Boolean = false;
    currentGroupsText: String = 'Select above options:';

    selectedFilterBatchYear: String = '';
    selectedFilterBatchSession: String = '';
    selectedFilterProgram: String = 'All Programs';

    noFilterBoolean: Boolean = true;
    tableBatchFilterBoolean: Boolean = false;
    programAddSelectBoolean: Boolean = false;
    tableProgramFilterBoolean: Boolean = false;

    constructor(
        private api: ApiService
    ) { }

    ngOnInit(): void {
        this.groupFilterSelectForm = new FormGroup({
            Program: new FormControl('All Programs'),
            Batch: new FormControl('All Batches')
        });
        this.api.getGroups({ Department: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.groups = new Array<Group>();
                res.forEach(e => this.groups.push(new Group(e)));
            }, (error: any) => console.log(error)
        );
        this.fetchPrograms();
        this.fetchBatches();
    }

    fetchBatches() {
        this.api.loadBatches({ Department: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.batches = new Array<Batch>();
                res.forEach(e => this.batches.push(new Batch(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    fetchPrograms() {
        this.api.loadPrograms({ Name: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.programs = new Array<Program>();
                res.forEach(e => this.programs.push(new Program(e)));
                console.log(this.programs)
            }, (error: any) => { console.log(error); }
        );
    }

    onProgramFilterSelect(programOption: String): void {
        if (programOption === 'All Programs') {
            this.programFilterSelectBoolean = false;
            this.setStudentFilters(true, false, false, '', '', '');
        } else {
            this.programFilterSelectBoolean = true;
            this.setStudentFilters(
                false, 
                true, 
                false, 
                programOption, 
                '', ''
            );
            this.batchesToDisplayFilter = new Array<Batch>();
            this.batches.forEach(e => {
                if (
                    localStorage.getItem('department') === e.Department &&
                    programOption === e.Program
                ) this.batchesToDisplayFilter.push(new Batch(e));
            });
        }
    }

    onBatchFilterSelect(batchOption: String): void {
        if (batchOption === 'All Batches') {
            this.setStudentFilters(
                false, 
                true, 
                false, 
                this.selectedFilterProgram, 
                '', ''
            );
        } else {
            this.setStudentFilters(
                false, 
                true, 
                true, 
                this.selectedFilterProgram, 
                batchOption.split('-')[0],
                batchOption.split('-')[1]
            );
        }
    }

    setStudentFilters(
        noFilterBoolean: Boolean, 
        tableProgramFilterBoolean: Boolean,
        tableBatchFilterBoolean: Boolean,
        selectedFilterProgram: String,
        selectedFilterBatchYear: String,
        selectedFilterBatchSession: String
    ) {
        this.noFilterBoolean = noFilterBoolean;
        this.tableProgramFilterBoolean = tableProgramFilterBoolean;
        this.tableBatchFilterBoolean = tableBatchFilterBoolean;
        this.selectedFilterProgram = selectedFilterProgram;
        this.selectedFilterBatchYear = selectedFilterBatchYear;
        this.selectedFilterBatchSession = selectedFilterBatchSession;
    }
}