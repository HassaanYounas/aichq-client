import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Batch } from 'src/app/models/batch.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-student-reg',
  templateUrl: './student-reg.component.html',
  styleUrls: ['./student-reg.component.scss']
})
export class StudentRegComponent implements OnInit {

  batches: Batch[];

  registerStudentOneForm: FormGroup;
  registerStudentTwoForm: FormGroup;
  registerTeamForm: FormGroup;

  validStudentOneName: Boolean = true;
  validStudentOneRollNumber: Boolean = true;
  validStudentTwoName: Boolean = true;
  validStudentTwoRollNumber: Boolean = true;
  validBatch: Boolean = true;
  validGroupUsername: Boolean = true;
  validPassword: Boolean = true;
  validPasswordConfirm: Boolean = true;
  invalidRegistration: Boolean = false;
  validRegistration: Boolean = false;
  errorMessage: String = '';
  successMessage: String = '';

  constructor(
    private api: ApiService,
    private validate: InputValidationService
  ) { }

  ngOnInit(): void {
    this.registerStudentOneForm = new FormGroup({
      Name: new FormControl(''),
      RollNumber: new FormControl('')
    });
    this.registerStudentTwoForm = new FormGroup({
      Name: new FormControl(''),
      RollNumber: new FormControl('')
    });
    this.registerTeamForm = new FormGroup({
      BatchID: new FormControl('Choose Batch'),
      GroupUsername: new FormControl(''),
      Password: new FormControl(''),
      PasswordConfirm: new FormControl('')
    });
    this.api.getSlimBatches().subscribe(
      (res: any) => {
        this.batches = new Array<Batch>();
        this.setBatches(res);
      }, (error: any) => { console.log(error); }
    );
  }

  submit(registerStudentOneFormData, registerStudentTwoFormData, registerTeamFormData) {
    if (!this.validate.isAlphabetsOnly(registerStudentOneFormData.Name))
      this.validStudentOneName = false;
    else this.validStudentOneName = true;
    if (!this.validate.isNumbersOnly(registerStudentOneFormData.RollNumber) || registerStudentOneFormData.RollNumber === '')
      this.validStudentOneRollNumber = false;
    else this.validStudentOneRollNumber = true;
    if (!this.validate.isAlphabetsOnly(registerStudentTwoFormData.Name))
      this.validStudentTwoName = false;
    else this.validStudentTwoName = true;
    if (!this.validate.isNumbersOnly(registerStudentTwoFormData.RollNumber) || registerStudentTwoFormData.RollNumber === '')
      this.validStudentTwoRollNumber = false;
    else this.validStudentTwoRollNumber = true;
    if (registerTeamFormData.BatchID === 'Choose Batch')
      this.validBatch = false;
    else this.validBatch = true;
    if (!this.validate.isAlphabetsAndNumbersOnly(registerTeamFormData.GroupUsername) || registerTeamFormData.GroupUsername === '')
      this.validGroupUsername = false;
    else this.validGroupUsername = true;
    if (registerTeamFormData.Password.length < 8)
      this.validPassword = false;
    else this.validPassword = true;
    if (registerTeamFormData.Password !== registerTeamFormData.PasswordConfirm)
      this.validPasswordConfirm = false;
    else this.validPasswordConfirm = true;
    if (
      this.validStudentOneName &&
      this.validStudentOneRollNumber &&
      this.validStudentTwoName &&
      this.validStudentTwoRollNumber &&
      this.validBatch &&
      this.validGroupUsername &&
      this.validPassword &&
      this.validPasswordConfirm
    ) {
      if (registerStudentOneFormData.RollNumber === registerStudentTwoFormData.RollNumber) {
        this.invalidRegistration = true;
        this.errorMessage = 'Roll numbers cannot be same.';
      } else {
        this.invalidRegistration = false;
        this.errorMessage = '';
        let batch = registerTeamFormData.BatchID.split('-');
        const body = {
          Year: batch[1],
          Program: batch[0],
          GroupUsername: registerTeamFormData.GroupUsername,
          Password: registerTeamFormData.Password,
          StudentOne: {
            Name: registerStudentOneFormData.Name,
            RollNumber: registerStudentOneFormData.RollNumber,
            Email: registerStudentOneFormData.RollNumber + '@students.au.edu.pk'
          },
          StudentTwo: {
            Name: registerStudentTwoFormData.Name,
            RollNumber: registerStudentTwoFormData.RollNumber,
            Email: registerStudentTwoFormData.RollNumber + '@students.au.edu.pk'
          }
        }
        this.api.registerGroup(body).subscribe(
          (res: any) => {
            this.invalidRegistration = false;
            this.validRegistration = true;
            this.successMessage = 'An email has been sent to both students for verification. ' +
            'Only after verification from both students will you be able to login to your dashboard.';
          }, (error: any) => { 
            this.errorMessage = error;
            this.invalidRegistration = true;
            this.validRegistration = false;
            setTimeout(() => {
              this.errorMessage = '';
              this.invalidRegistration = false;
              this.validRegistration = false;
            }, 3000); 
          }
        );
      }
    }
  }

  setBatches(res: any) {
    res.forEach(e => {
      let batch = new Batch();
      batch.assignValues(e);
      this.batches.push(batch);
    });
  }
}
