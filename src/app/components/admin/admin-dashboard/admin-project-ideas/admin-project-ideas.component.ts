import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Batch } from 'src/app/models/batch.model';
import { Group } from 'src/app/models/group.model';
import { Program } from 'src/app/models/program.model';
import { Supervisor } from 'src/app/models/supervisor.model';
import { SupervisorProposal } from 'src/app/models/supervisor.proposal.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-project-ideas',
  templateUrl: './admin-project-ideas.component.html'
})
export class AdminProjectIdeasComponent implements OnInit {

    studentsCSV: File = null;

    batches: Batch[];
    programs: Program[];
    batchesToDisplayFilter: Batch[];

    selectedFilterBatchYear: String = '';
    selectedFilterBatchSession: String = '';
    selectedFilterProgram: String = 'All Programs';

    ideaFilterSelectForm: FormGroup;

    noFilterBoolean: Boolean = true;
    tableBatchFilterBoolean: Boolean = false;
    programAddSelectBoolean: Boolean = false;
    tableProgramFilterBoolean: Boolean = false;
    programFilterSelectBoolean: Boolean = false;

    supervisors: Supervisor[];
    supervisorProposals: SupervisorProposal[];

    currentProjectID: String;
    currentProposalTitle: String;
    currentSupervisorEmail: String;

    constructor(
        private api: ApiService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.ideaFilterSelectForm = new FormGroup({
            Program: new FormControl('All Programs'),
            Batch: new FormControl('All Batches')
        });
        this.fetchBatches();
        this.fetchSupervisors();
        this.fetchPrograms();
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
            }, (error: any) => { console.log(error); }
        );
    }

    fetchSupervisors() {
        this.api.loadSupervisors({ Department: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.supervisors = new Array<Supervisor>();
                res.forEach(e => this.supervisors.push(new Supervisor(e)));
                this.fetchProposals();
            }, (error: any) => { console.log(error); }
        );
    }

    fetchProposals() {
        this.api.loadProposals({ Department: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.supervisorProposals = new Array<SupervisorProposal>();
                res.forEach(e => this.supervisorProposals.push(new SupervisorProposal(e)));
                this.supervisors.forEach(e => {
                    e.setProposals(this.supervisorProposals);
                });
            }, (error: any) => { console.log(error); }
        );
    }

    onSupervisorIdeaApproval() {
        this.supervisorProposalUpdate(this.currentProjectID, 1);
    }

    onSupervisorIdeaReject() {
        this.supervisorProposalUpdate(this.currentProjectID, 0);
    }

    setCurrentProjectID(id: String, email: String) {
        this.currentProjectID = id;
        this.currentSupervisorEmail = email;
    }

    supervisorProposalUpdate(id: String, approval: Number) {
        this.spinner.show();
        this.api.updateSupervisorProposal({
            Department: localStorage.getItem('department'),
            _id: id, 
            Email: this.currentSupervisorEmail, 
            Approved: approval 
        }).subscribe(
            (res: any) => {
                this.fetchProposals();
                this.spinner.hide();
            }, (error: any) => console.log(error)
        );
    }

    onProgramFilterSelect(programOption: String): void {
        if (programOption === 'All Programs') {
            this.programFilterSelectBoolean = false;
            // if (this.selectedFilterDepartment === 'All Departments')
            //     this.setStudentFilters(true, false, false, false, '', '', '', '');
            // else
            //     this.setStudentFilters(false, true, false, false, this.selectedFilterDepartment, '', '', '');
        } else {
            this.programFilterSelectBoolean = true;
            // this.setStudentFilters(
            //     false, 
            //     false, 
            //     true, 
            //     false, 
            //     this.selectedFilterDepartment, 
            //     '', '', ''
            // );                  
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
        // if (batchOption === 'All Batches') {
        //     this.setStudentFilters(
        //         false,
        //         false,
        //         true,
        //         false,
        //         this.selectedFilterDepartment,
        //         this.selectedFilterProgram,
        //         '', ''
        //     );
        // } else {
        //     this.setStudentFilters(
        //         false,
        //         false,
        //         false,
        //         true,
        //         this.selectedFilterDepartment,
        //         this.selectedFilterProgram,
        //         batchOption.split('-')[1],
        //         batchOption.split('-')[0]
        //     );
        // }
    }
}