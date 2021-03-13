import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Department } from 'src/app/models/department.model';
import { Program } from 'src/app/models/program.model';
import { Supervisor } from 'src/app/models/supervisor.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-supervisor-proposals',
  templateUrl: './supervisor-proposals.component.html'
})
export class SupervisorProposalsComponent implements OnInit {

  @Input() departments: Department[];
  @Input() supervisor: Supervisor;

  departmentFilterSelect: Department;
  programFilterSelect: Program;
  departmentSubmitProposal: Department;
  programSubmitProposal: Program;

  submitProposalForm: FormGroup;
  proposalFilterSelectForm: FormGroup;

  departmentFilterSelectBoolean: Boolean = false;
  departmentSubmitProposalBoolean: Boolean = false;
  programFilterSelectBoolean: Boolean = false;
  programSubmitProposalBoolean: Boolean = false;
  validSubmitProposal: Boolean = true;
  currentProposalsText: String = 'Select above options:';
  submitProposalMessage: String = '';

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private validate: InputValidationService
  ) { }

  ngOnInit(): void {
    this.proposalFilterSelectForm = new FormGroup({
      Department: new FormControl('Department'),
      Program: new FormControl('Program'),
      Batch: new FormControl('Batch')
    });
    this.submitProposalForm = new FormGroup({
      Title: new FormControl(''),
      Abstract: new FormControl(''),
      Domain: new FormControl(''),
      Department: new FormControl('Department'),
      Program: new FormControl('Program'),
      Batch: new FormControl('Batch')
    });
  }

  onSubmitProposalFormSubmit(formData: any): void {
    if (
      formData.Title !== '' &&
      formData.Domain !== '' &&
      formData.Abstract !== '' &&
      formData.Department !== 'Department' &&  
      formData.Program !== 'Program' &&  
      formData.Batch !== 'Batch'  
    ) {
      this.spinner.show();
      this.api.submitSupervisorProposal({
        Department: formData.Department,
        Program: formData.Program,
        Session: formData.Batch.split('-')[0],
        Year: formData.Batch.split('-')[1],
        Title: formData.Title,
        Abstract: formData.Abstract,
        Domain: formData.Domain,
        Email: this.supervisor.Email
      }).subscribe(
        (res: any) => {
          this.addSubmitProposalResponse('Proposal submitted successfully.');
          this.submitProposalForm.controls['Batch'].setValue('Batch');
          this.submitProposalForm.controls['Department'].setValue('Department');
          this.submitProposalForm.controls['Program'].setValue('Program');
          this.submitProposalForm.controls['Title'].setValue('');
          this.submitProposalForm.controls['Domain'].setValue('');
          this.submitProposalForm.controls['Abstract'].setValue('');
          // this.updateBatches.emit(true);
        }, (error: any) => this.addSubmitProposalResponse(error)
      );
      this.validSubmitProposal = true;
      setTimeout(() => this.submitProposalMessage = '', 4000);
    } else this.validSubmitProposal = false;
  }

  addSubmitProposalResponse(message: String): void {
    setTimeout(() => { 
      this.spinner.hide();
      this.submitProposalMessage = message;
    }, 1000);
  }

  onDepartmentSubmitSupervisorProposal(departmentOption: String): void {
    if (departmentOption === 'Department') this.departmentSubmitProposalBoolean = false;
    else {
      for (let i = 0; i < this.departments.length; i++) {
        if (departmentOption === this.departments[i].Name) {
          this.departmentSubmitProposal = this.departments[i];
          this.departmentSubmitProposalBoolean = true;
        }
      }
    }
  }
  
  onProgramSubmitSupervisorProposal(programOption: String): void {
    if (programOption === 'Program') this.programSubmitProposalBoolean = false;
    else {
      for (let i = 0; i < this.departmentSubmitProposal.Programs.length; i++) {
        if (programOption === this.departmentSubmitProposal.Programs[i].Title) {
        //   this.programSubmitProposal = this.departmentSubmitProposal.Programs[i];
          this.programSubmitProposalBoolean = true;
        }
      }
    }
  }

  onDepartmentSelectFilter(departmentOption: String): void {
    if (departmentOption === 'Department') this.departmentFilterSelectBoolean = false;
    else {
      for (let i = 0; i < this.departments.length; i++) {
        if (departmentOption === this.departments[i].Name) {
          this.departmentFilterSelect = this.departments[i];
          this.departmentFilterSelectBoolean = true;
        }
      }
    }
  }

  onProgramSelectFilter(programOption: String): void {
    if (programOption === 'Program') this.programFilterSelectBoolean = false;
    else {
      for (let i = 0; i < this.departmentFilterSelect.Programs.length; i++) {
        if (programOption === this.departmentFilterSelect.Programs[i].Title) {
        //   this.programFilterSelect = this.departmentFilterSelect.Programs[i];
          this.programFilterSelectBoolean = true;
        }
      }
    }
  }

  onBatchSelectFilter(batchOption: String): void {
    if (batchOption !== 'Batch') {
      this.currentProposalsText = `Proposals of ${this.departmentFilterSelect.Name} department (${this.programFilterSelect.Title} ${batchOption}):`;
    }
  }
}