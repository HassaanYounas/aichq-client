import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-reg',
  templateUrl: './student-reg.component.html',
  styleUrls: ['./student-reg.component.scss']
})
export class StudentRegComponent implements OnInit {

  registerStudentOneForm: FormGroup;
  registerStudentTwoForm: FormGroup;
  registerTeamForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.registerStudentOneForm = new FormGroup({
      Name: new FormControl(''),
      RollNumber: new FormControl(''),
      Email: new FormControl(''),
      Contact: new FormControl(''),
      CGPA: new FormControl(''),
    });
    this.registerStudentTwoForm = new FormGroup({
      Name: new FormControl(''),
      RollNumber: new FormControl(''),
      Email: new FormControl(''),
      Contact: new FormControl(''),
      CGPA: new FormControl(''),
    });
    this.registerTeamForm = new FormGroup({
      Username: new FormControl(''),
      Password: new FormControl(''),
    });
  }

}
