import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Batch } from 'src/app/models/batch.model';
import { Supervisor } from 'src/app/models/supervisor.model';
import { SupervisorBatch } from 'src/app/models/supervisorBatch.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-admin-supervisors',
  templateUrl: './admin-supervisors.component.html',
  styleUrls: ['./admin-supervisors.component.scss']
})
export class AdminSupervisorsComponent implements OnInit {

  @Input() supervisors: Supervisor[];
  @Input() batches: Batch[];

  supervisorBatches: SupervisorBatch[];
  currentSupervisor: Supervisor;
  currentBatch: Batch;

  addSupervisorForm: FormGroup;
  deleteSupervisorForm: FormGroup;

  validFullName: Boolean = true;
  validUsername: Boolean = true;
  validDeleteUsername: Boolean = true;

  addSupervisorError: String = '';
  deleteSupervisorError: String = '';
  addSupervisorToBatchError: String = '';
  addSupervisorToBatchModalTitle: String = '';

  constructor(
    private api: ApiService,
    private validate: InputValidationService
  ) { }

  ngOnInit(): void {
    this.addSupervisorForm = new FormGroup({
      FullName: new FormControl(''),
      Username: new FormControl(''),
      Password: new FormControl('123456789')
    });
    this.deleteSupervisorForm = new FormGroup({
      Username: new FormControl('')
    });
    this.setSupervisorBatches();
  }

  setSupervisorBatches(): void {
    this.supervisorBatches = new Array<SupervisorBatch>();
    for (let i = 0; i < this.batches.length; i++) {
      let sb: SupervisorBatch = new SupervisorBatch();
      sb.Batch = this.batches[i].Year.toString() + '-' + this.batches[i].Program; 
      for (let j = 0; j < this.batches[i].Supervisors.length; j++) {
        for (let k = 0; k < this.supervisors.length; k++)
          if (this.batches[i].Supervisors[j].Username === this.supervisors[k].Username)
            sb.Supervisors.push(this.supervisors[k]);
      } this.supervisorBatches.push(sb);
    }
  }

  onAddSupervisorFormSubmit(formData: any): void {
    if (!this.validate.isAlphabetsOnly(formData.FullName)) this.validFullName = false;
    else this.validFullName = true;
    if (!this.validate.isSupervisorUsername(formData.Username)) this.validUsername = false;
    else this.validUsername = true;
    if (this.validFullName && this.validUsername) {
      this.api.addSupervisor(formData).subscribe(
        (res: any) => {
          window.location.reload();
        }, (error: any) => { 
          this.addSupervisorError = error;
          setTimeout(() => this.addSupervisorError = '', 3000);
        }
      );
    }
  }

  onDeleteSupervisorFormSubmit(formData: any): void {
    if (formData.Username === '') this.validDeleteUsername = false;
    else this.validDeleteUsername = true;
    if (this.validDeleteUsername) {
      this.api.deleteSupervisor(formData).subscribe(
        (res: any) => {
          window.location.reload();
        }, (error: any) => { 
          this.deleteSupervisorError = error;
          setTimeout(() => this.deleteSupervisorError = '', 3000);
        }
      );
    }
  }

  setCurrentSupervisor(i: number): void {
    this.currentSupervisor = this.supervisors[i];
    this.addSupervisorToBatchModalTitle = 'Add ' + this.currentSupervisor.FullName + ' to an FYP Batch';
  }

  setCurrentBatch(i: number): void {
    this.currentBatch = this.batches[i];
  }

  addSupervisorToBatch(): void {
    this.api.addSupervisorToBatch({
      Year: this.currentBatch.Year,
		  Program: this.currentBatch.Program,
		  Username: this.currentSupervisor.Username
    }).subscribe(
      (res: any) => {
        window.location.reload();
      }, (error: any) => { 
        this.addSupervisorToBatchError = error;
        setTimeout(() => this.addSupervisorToBatchError = '', 3000);
      }
    );
  }
}