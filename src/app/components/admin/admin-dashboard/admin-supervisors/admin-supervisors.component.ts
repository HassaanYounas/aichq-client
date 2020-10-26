import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Department } from 'src/app/models/department.model';
import { SupervisorView } from 'src/app/models/supervisor-view.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

declare const $: any;

@Component({
  selector: 'app-admin-supervisors',
  templateUrl: './admin-supervisors.component.html'
})
export class AdminSupervisorsComponent implements OnInit {

  @Input() departments: Department[];

  supervisorsView: SupervisorView[];

  supervisorsCSV: File = null;

  addSupervisorForm: FormGroup;
  addSupervisorBulkForm: FormGroup;
  departmentSelectForm: FormGroup;

  validEmail: Boolean = true;
  validFullName: Boolean = true;
  validAddSupervisor: Boolean = true;
  validAddSupervisorBulk: Boolean = true;
  fileUploaded: Boolean = false;
  addSupervisorMessage: String = '';
  addSupervisorBulkMessage: String = '';

  constructor(
    private api: ApiService,
    private validate: InputValidationService,
    private spinner: NgxSpinnerService,
    private ngxCsvParser: NgxCsvParser
  ) { }

  ngOnInit(): void {
    $('.custom-file-input').on('change', function() {
      let fileName = $(this).val().split('\\').pop();
      $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
    });
    this.departmentSelectForm = new FormGroup({
      Department: new FormControl('Department'),
    });
    this.addSupervisorForm = new FormGroup({
      Title: new FormControl('Title'),
      FullName: new FormControl(''),
      Email: new FormControl(''),
      Designation: new FormControl('Designation'),
      Department: new FormControl('Department'),
    });
    this.addSupervisorBulkForm = new FormGroup({
      Department: new FormControl('Department')
    });
  }

  onDepartmentFilterSelect(departmentOption: String): void {
    if (departmentOption !== 'Department') {
      this.supervisorsView = new Array<SupervisorView>();
      for (let i = 0; i < this.departments.length; i++) {
        if (this.departments[i].Name === departmentOption) {
          for (let j = 0; j < this.departments[i].Supervisors.length; j++) {
            const supervisor = new SupervisorView(
              this.departments[i].Supervisors[j].Active,
              this.departments[i].Supervisors[j].FullName,
              this.departments[i].Supervisors[j].Designation,
              0, 
              0, 
              0
            );
            this.supervisorsView.push(supervisor);
          }
          this.supervisorsView.sort((a, b) => {
            return (a.Designation > b.Designation) ? 1 : ((b.Designation > a.Designation) ? -1 : 0);
          });
        }
      }
    }
  }

  onAddSupervisorFormSubmit(formData: any): void {
    if (!this.validate.isAlphabetsOnly(formData.FullName)) this.validFullName = false;
    else this.validFullName = true;
    if (!this.validate.isEmail(formData.Email)) this.validEmail = false;
    else this.validEmail = true;
    if (
      formData.Title === 'Title' || 
      formData.Department === 'Department' || 
      formData.Designation === 'Designation'
    ) {
      this.validAddSupervisor = false;
    } else {
      this.validAddSupervisor = true;
      this.spinner.show();
      const body = {
        FullName: formData.Title + ' ' + formData.FullName,
        Email: formData.Email,
        Department: formData.Department,
        Designation: formData.Designation
      }
      this.api.addSupervisor(body).subscribe(
        (res: any) => {
          this.addSupervisorResponse('Supervisor added successfully.');
        }, (error: any) => this.addSupervisorResponse(error)
      );
      setTimeout(() => this.addSupervisorMessage = '', 4000);
    }
  }

  addSupervisorResponse(message: String): void {
    setTimeout(() => { 
      this.spinner.hide();
      this.addSupervisorMessage = message;
    }, 1000);
  }

  onAddSupervisorBulkFormSubmit(formData: any): void {
    if (formData.Department === 'Department' || !this.fileUploaded) this.validAddSupervisorBulk = false;
    else {
      this.validAddSupervisorBulk = true;
      this.ngxCsvParser.parse(this.supervisorsCSV, { header: true, delimiter: ',' })
        .pipe().subscribe((result: Array<any>) => {
          const body = [];
          for (let i = 0; i < result.length; i++) {
            body.push({
                FullName: result[i].FullName,
                Email: result[i].Email,
                Department: formData.Department,
                Designation: result[i].Designation
            });
          }
          this.api.addSupervisorsBulk(body).subscribe(
            (res: any) => {
              console.log('dadsa');
            }, (error: any) => {
              // this.addSupervisorResponse(error)
          });
        }, (error: NgxCSVParserError) => console.log(error));
    }
  }

  handleFileInput(files: FileList): void { 
    this.supervisorsCSV = files[0];
    this.fileUploaded = true;
  }
}