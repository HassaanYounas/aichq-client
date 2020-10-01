import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Admin } from 'src/app/models/admin.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  @Input() admin: Admin;

  adminInfoUpdateForm: FormGroup;

  validFullName: boolean = true;
  validUsername: boolean = true;
  validPassword: boolean = true;

  constructor(
    private validate: InputValidationService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.adminInfoUpdateForm = new FormGroup({
      FullName: new FormControl(this.admin.FullName),
      Username: new FormControl(this.admin.Username),
      Password: new FormControl('')
    });
  }

  onSubmit(formData: any): void {
    if (!this.validate.isAlphabetsOnly(formData.FullName)) this.validFullName = false;
    else this.validFullName = true;
    if (!this.validate.isAlphabetsAndNumbersOnly(formData.Username) || formData.Username === '') this.validUsername = false;
    else this.validUsername = true;
    if (formData.Password === '') this.validPassword = false;
    else this.validPassword = true;
    if (this.validFullName && this.validUsername && this.validPassword) {
      this.api.updateAdmin(formData)
      .subscribe(
        (res: any) => {
          window.location.reload();
        }, (error: any) => { console.log(error); }
      );
    }
  }
}
