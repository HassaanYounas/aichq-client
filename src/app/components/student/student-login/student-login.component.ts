import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      GroupUsername: new FormControl(''),
      Password: new FormControl(''),
    });
  }

  onSubmit(formData: any): void {
    if (formData.Password === '' && formData.GroupUsername === '') {
      this.validLogin = false;
      this.errorMessage = 'Username and Password are required.';
    } else if (formData.GroupUsername === '') {
      this.validLogin = false;
      this.errorMessage = 'Username cannot be empty.';
    } else if (formData.Password === '') {
      this.validLogin = false;
      this.errorMessage = 'Password cannot be empty.';
    } else {
      // this.api.loginSupervisor(formData).subscribe(
      //   (res: any) => {
      //     if (res.token !== '') {
      //       this.validLogin = true;
      //       localStorage.setItem('token', res.token);
      //       localStorage.setItem('id', res._id);
      //       localStorage.setItem('type', 'Supervisor');
      //       this.router.navigate(['/']);
      //     }
      //   }, (error: any) => { this.validLogin = false; this.errorMessage = error; }
      // );
    }
  }
}
