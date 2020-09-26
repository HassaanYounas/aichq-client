import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup;
  validLogin: boolean = true;
  errorMessage: string = '';

  constructor(
    private inputValidation: InputValidationService,
    private api: ApiService,
    private router: Router
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
      if (this.inputValidation.isAlphabetsAndNumbersOnly(
        this.loginForm.value.Username
      )) {
        this.api.adminLogin(formData).subscribe(
          (res: any) => {
            if (res.token !== '') {
              this.validLogin = true;
              localStorage.setItem('token', res.token);
              localStorage.setItem('id', res._id);
              localStorage.setItem('type', 'Administrator');
              this.router.navigate(['/']);
            }
          }, (error: any) => { this.validLogin = false; this.errorMessage = error; }
        );
      }
    }
  }
}