import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-fyp-batches',
  templateUrl: './admin-fyp-batches.component.html',
  styleUrls: ['./admin-fyp-batches.component.scss']
})
export class AdminFypBatchesComponent implements OnInit {

  newBatchForm: FormGroup;
  editBatchForm: FormGroup;
  deleteBatchForm: FormGroup;

  constructor() { }

  ngOnInit(): void { 
    this.newBatchForm = new FormGroup({
      Username: new FormControl('')
    });
    this.editBatchForm = new FormGroup({
      Username: new FormControl('')
    });
    this.deleteBatchForm = new FormGroup({
      Username: new FormControl('')
    });
  }

}
