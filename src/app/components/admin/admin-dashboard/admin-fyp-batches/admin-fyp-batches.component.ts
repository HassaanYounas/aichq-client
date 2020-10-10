import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Batch } from 'src/app/models/batch.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-admin-fyp-batches',
  templateUrl: './admin-fyp-batches.component.html'
})
export class AdminFypBatchesComponent implements OnInit {

  @Input() batches: Batch[];

  years: Number[];
  validYear: Boolean = true;
  validProgram: Boolean = true;
  validPhase: Boolean = true;
  validPromoteBatch: Boolean = true;
  validDeleteBatchYear: Boolean = true;
  validDeleteBatchProgram: Boolean = true;

  addBatchError: String = '';
  promoteBatchError: String = '';
  deleteBatchError: String = '';

  newBatchForm: FormGroup;
  promoteBatchForm: FormGroup;
  deleteBatchForm: FormGroup;

  constructor(
    private api: ApiService,
    private validate: InputValidationService
  ) { }

  ngOnInit(): void {
    let year = new Date().getFullYear() - 2;
    this.years = new Array<Number>(7);
    for (let i = 0; i < 7; i++) this.years[i] = year++;
    this.newBatchForm = new FormGroup({
      Year: new FormControl('Batch Year'),
      Program: new FormControl(''),
      Phase: new FormControl('FYP Phase')
    });
    this.promoteBatchForm = new FormGroup({
      BatchID: new FormControl('')
    });
    this.deleteBatchForm = new FormGroup({
      Year: new FormControl(''),
      Program: new FormControl('')
    });
  }

  onNewBatchFormSubmit(formData: any): void {
    if (formData.Year === 'Batch Year') this.validYear = false;
    else this.validYear = true;
    if (!this.validate.isProgram(formData.Program) || formData.Program === '') 
      this.validProgram = false;
    else this.validProgram = true;
    if (formData.Phase === 'FYP Phase') this.validPhase = false;
    else this.validPhase = true;
    if (this.validYear && this.validProgram && this.validPhase) {
      this.api.createBatch(formData).subscribe(
        (res: any) => {
          window.location.reload();
        }, (error: any) => {
          this.addBatchError = error;
          setTimeout(() => this.addBatchError = '', 3000); 
        }
      );
    }
  }

  onPromoteBatchFormSubmit(formData: any): void {
    const batchInfo = formData.BatchID.split('-');
    if (batchInfo.length === 1) this.validPromoteBatch = false;
    else {
      this.validPromoteBatch = true;
      let phase: number = 1;
      this.batches.forEach(batch => {
        if (batch.Program === batchInfo[0] && batch.Year === Number(batchInfo[1])) {
          phase = batch.Phase.valueOf();
          if (phase !== 3) {
            const body = {
              Program: batchInfo[0],
              Year: batchInfo[1],
              Phase: ++phase
            };
            this.api.promoteBatch(body).subscribe(
              (res: any) => {
                window.location.reload();
              }, (error: any) => { console.log(error); }
            );
          } else this.promoteBatchError = 'Batch is Already in Last Phase.';
          return;
        }
      });
    }
  }

  onDeleteBatchFormSubmit(formData: any): void {
    if (formData.Year === '') this.validDeleteBatchYear = false;
    else this.validDeleteBatchYear = true;
    if (formData.Program === '') this.validDeleteBatchProgram = false;
    else this.validDeleteBatchProgram = true;
    if (this.validDeleteBatchYear && this.validDeleteBatchProgram) {
      this.api.deleteBatch(formData).subscribe(
        (res: any) => {
          window.location.reload();
        }, (error: any) => {
          this.deleteBatchError = error;
          setTimeout(() => this.deleteBatchError = '', 3000); 
        }
      );
    }
  }
}