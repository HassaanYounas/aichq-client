import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Batch } from 'src/app/models/batch.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.scss']
})
export class AdminStudentsComponent implements OnInit {

  @Input() batches: Batch[];

  addStudentForm: FormGroup;
  deleteStudentForm: FormGroup;

  validAddStudentBatch: Boolean = true;
  validDeleteStudentBatch: Boolean = true;

  addStudentError: String = '';
  deleteStudentError: String = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.addStudentForm = new FormGroup({
      BatchID: new FormControl('Choose Batch'),
      RollNumber: new FormControl('')
    });
    this.deleteStudentForm = new FormGroup({
      BatchID: new FormControl('Choose Batch'),
      RollNumber: new FormControl('')
    });
  }

  onAddStudentFormSubmit(formData: any): void {
    if (formData.BatchID === 'Choose Batch') this.validAddStudentBatch = false;
    else this.validAddStudentBatch = true;
    if (this.validAddStudentBatch) {
      const batchInfo = formData.BatchID.split('-');
      const body = {
        Program: batchInfo[0],
        Year: batchInfo[1],
        RollNumber: formData.RollNumber
      };
      this.api.addStudentToBatch(body).subscribe(
        (res: any) => {
          window.location.reload();
        }, (error: any) => { 
          this.addStudentError = error;
          setTimeout(() => this.addStudentError = '', 3000); 
        }
      );
    }
  }

  onDeleteStudentFormSubmit(formData: any): void {
    if (formData.BatchID === 'Choose Batch') this.validDeleteStudentBatch = false;
    else this.validDeleteStudentBatch = true;
    if (this.validDeleteStudentBatch) {
      const batchInfo = formData.BatchID.split('-');
      const body = {
        Program: batchInfo[0],
        Year: batchInfo[1],
        RollNumber: formData.RollNumber
      };
      this.api.deleteStudentFromBatch(body).subscribe(
        (res: any) => {
          window.location.reload();
        }, (error: any) => { 
          this.deleteStudentError = error;
          setTimeout(() => this.deleteStudentError = '', 3000); 
        }
      );
    }
  }
}
