import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html'
})
export class StudentLoginComponent implements OnInit {

  loginForm: FormGroup;
  validLogin: Boolean = true;
  errorMessage: String = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Username: new FormControl(''),
      Password: new FormControl(''),
    });
  }

  onSubmit(formData: any): void {
    if (formData.Password === '' && formData.Username === '') {
      this.validLogin = false;
      this.errorMessage = 'Username and Password are required.';
    } else if (formData.Username === '') {
      this.validLogin = false;
      this.errorMessage = 'Username cannot be empty.';
    } else if (formData.Password === '') {
      this.validLogin = false;
      this.errorMessage = 'Password cannot be empty.';
    } else {
      this.spinner.show();
      this.api.loginGroup(formData).subscribe(
        (res: any) => {
          if (res.token !== '') {
            this.validLogin = true;
            localStorage.setItem('token', res.token);
            localStorage.setItem('id', res._id);
            localStorage.setItem('department', res.Department);
            localStorage.setItem('session', res.Session);
            localStorage.setItem('year', res.Year);
            localStorage.setItem('program', res.Program);
            localStorage.setItem('type', 'Student');
            setTimeout(() => { 
              this.spinner.hide();
              this.router.navigate(['/']);
            }, 1000);
          }
        }, (error: any) => { 
          setTimeout(() => { 
            this.spinner.hide();
            this.validLogin = false; 
            this.errorMessage = error; 
          }, 1000);}
      );      
    }
  }
}