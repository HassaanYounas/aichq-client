import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/models/batch.model';
import { Program } from 'src/app/models/program.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Department } from 'src/app/models/department.model';
import { Supervisor } from 'src/app/models/supervisor.model';
import { SupervisorProposal } from 'src/app/models/supervisor.proposal.model';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-supervisor-proposals',
  templateUrl: './supervisor-proposals.component.html'
})
export class SupervisorProposalsComponent implements OnInit {

    batches: Batch[];
    programs: Program[];
    proposals: SupervisorProposal[];
    batchesToDisplaySubmit: Batch[];
    batchesToDisplayFilter: Batch[];

    programFilterSelect: Program;
    departmentFilterSelect: Department;

    submitProposalForm: FormGroup;
    proposalFilterSelectForm: FormGroup;

    validSubmitProposal: Boolean = true;
    programsLoadedBoolean: Boolean = false;
    programFilterSelectBoolean: Boolean = false;
    programSubmitProposalBoolean: Boolean = false;
    
    submitProposalMessage: String = '';

    constructor(
        private spinner: NgxSpinnerService,
        private api: ApiService,
        private validate: InputValidationService
    ) { }

    ngOnInit(): void {
        this.proposalFilterSelectForm = new FormGroup({
            Program: new FormControl('Program'),
            Batch: new FormControl('Batch')
        });
        this.submitProposalForm = new FormGroup({
            Title: new FormControl(''),
            Abstract: new FormControl(''),
            Domain: new FormControl(''),
            Program: new FormControl('Program'),
            Batch: new FormControl('Batch')
        });
        this.fetchPrograms();
        this.fetchBatches();
        this.fetchProposals();
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
        this.api.loadBatches({ Name: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.batches = new Array<Batch>();
                res.forEach(e => this.batches.push(new Batch(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    fetchProposals() {
        this.api.loadProposals({ 
            Department: localStorage.getItem('department'),
            Email: localStorage.getItem('email') 
        }).subscribe(
            (res: any) => {
                this.proposals = new Array<SupervisorProposal>();
                res.forEach(e => this.proposals.push(new SupervisorProposal(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    onSubmitProposalFormSubmit(formData: any): void {
        if (
            formData.Title !== '' &&
            formData.Domain !== '' &&
            formData.Abstract !== '' &&
            formData.Program !== 'Program' &&  
            formData.Batch !== 'Batch'  
        ) {
            this.spinner.show();
            this.api.submitSupervisorProposal({
                Department: localStorage.getItem('department'),
                Program: formData.Program,
                Session: formData.Batch.split('-')[0],
                Year: formData.Batch.split('-')[1],
                Title: formData.Title,
                Abstract: formData.Abstract,
                Domain: formData.Domain,
                Email: localStorage.getItem('email')
            }).subscribe(
                (res: any) => {
                    this.addSubmitProposalResponse('Proposal submitted successfully.');
                    this.submitProposalForm.controls['Batch'].setValue('Batch');
                    this.submitProposalForm.controls['Program'].setValue('Program');
                    this.submitProposalForm.controls['Title'].setValue('');
                    this.submitProposalForm.controls['Domain'].setValue('');
                    this.submitProposalForm.controls['Abstract'].setValue('');
                    this.fetchProposals();
                }, (error: any) => this.addSubmitProposalResponse(error)
            );
            this.validSubmitProposal = true;
            // setTimeout(() => this.submitProposalMessage = '', 4000);
        } else this.validSubmitProposal = false;
    }

    addSubmitProposalResponse(message: String): void {
        setTimeout(() => { 
            this.spinner.hide();
            this.submitProposalMessage = message;
        }, 1000);
    }
    
    onProgramSubmitSupervisorProposal(programOption: String): void {
        if (programOption === 'Program') this.programSubmitProposalBoolean = false;
        else {
            this.batchesToDisplaySubmit = new Array<Batch>();
            this.batches.forEach(e => {
                if (e.Program === programOption) this.batchesToDisplaySubmit.push(e);
            });
            this.programSubmitProposalBoolean = true;
        }
    }

    onProgramSelectFilter(programOption: String): void {
        if (programOption === 'Program') this.programFilterSelectBoolean = false;
        else {
            this.batchesToDisplayFilter = new Array<Batch>();
            this.batches.forEach(e => {
                if (e.Program === programOption) this.batchesToDisplayFilter.push(e);
            });
            this.programFilterSelectBoolean = true;
        }
    }

    onBatchSelectFilter(batchOption: String): void {
        // if (batchOption !== 'Batch') {
        // this.currentProposalsText = `Proposals of ${this.departmentFilterSelect.Name} department (${this.programFilterSelect.Title} ${batchOption}):`;
        // }
    }
}