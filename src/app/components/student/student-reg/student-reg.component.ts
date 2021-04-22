import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Batch } from 'src/app/models/batch.model';
import { Department } from 'src/app/models/department.model';
import { Program } from 'src/app/models/program.model';
import { Student } from 'src/app/models/student.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-student-reg',
  templateUrl: './student-reg.component.html'
})
export class StudentRegComponent implements OnInit {

    batches: Batch[];
    students: Student[];
    departments: Department[];
    batchesToDisplayFilter: Batch[];

    programAddSelect: Program;
    departmentAddSelect: Department;

    validInput: Boolean = true;
    validAddStudent: Boolean = true;
    batchAddSelectBoolean: Boolean = false;
    programAddSelectBoolean: Boolean = false;
    departmentAddSelectBoolean: Boolean = false;

    registrationForm: FormGroup;
    
    constructor(
        private api: ApiService,
        private validate: InputValidationService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.registrationForm = new FormGroup({
            StudentOne: new FormControl('Student One'),
            StudentTwo: new FormControl('Student Two'),
            Department: new FormControl('Department'),
            Program: new FormControl('Program'),
            Batch: new FormControl('Batch'),
            Username: new FormControl(''),
            Password: new FormControl('')
        });
        this.fetchDepartments();
        this.fetchBatches();
    }

    fetchDepartments() {
        this.api.loadDepartments().subscribe(
            (res: any) => {
                this.departments = new Array<Department>();
                res.forEach(e => this.departments.push(new Department(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    fetchBatches() {
        this.api.loadBatches({}).subscribe(
            (res: any) => {
                this.batches = new Array<Batch>();
                res.forEach(e => this.batches.push(new Batch(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    onSubmit(formData: any): void {
        if (
            formData.StudentOne !== 'Student One' &&
            formData.StudentTwo !== 'Student Two' &&
            formData.StudentOne !== formData.StudentTwo &&
            formData.Department !== 'Department' &&
            formData.Program !== 'Program' &&
            formData.Batch !== 'Batch' &&
            this.validate.isAlphabetsAndNumbersOnly(formData.Username) && 
            formData.Username !== ''
        ) {
            this.validInput = true;
            let departmentID: String = '';
            this.departments.forEach(d => {
                if (d.Name === formData.Department) departmentID = d.ID;
            });
            const body = {
                DepartmentID: departmentID,
                Department: formData.Department,
                Program: formData.Program,
                Session: formData.Batch.split('-')[0],
                Year: formData.Batch.split('-')[1],
                Username: formData.Username,
                Password: formData.Password,
                StudentOne: {
                    FullName: formData.StudentOne.split('-')[0],
                    RollNumber: formData.StudentOne.split('-')[1],
                    Email: formData.StudentOne.split('-')[1] + '@students.au.edu.pk'
                },
                StudentTwo: {
                    FullName: formData.StudentTwo.split('-')[0],
                    RollNumber: formData.StudentTwo.split('-')[1],
                    Email: formData.StudentTwo.split('-')[1] + '@students.au.edu.pk'
                }
            }
            this.spinner.show();
            this.api.registerGroup(body).subscribe(
                (res: any) => {
                    if (res.token !== '') {
                        setTimeout(() => { 
                            this.spinner.hide();
                            this.router.navigate(['/student/reg/pending']);
                        }, 1000);
                    }
                }, (error: any) => setTimeout(() => this.spinner.hide(), 1000) 
            );
        } else this.validInput = false;
    }

    onDepartmentAddStudent(departmentOption: String) {
        if (departmentOption === 'Department') this.departmentAddSelectBoolean = false;
        else {
            for (let i = 0; i < this.departments.length; i++) {
                if (departmentOption === this.departments[i].Name) {
                    this.departmentAddSelect = this.departments[i];
                    this.departmentAddSelectBoolean = true;
                }
            }
        }
    }

    onProgramAddStudent(programOption: String) {
        if (programOption === 'Program') this.programAddSelectBoolean = false;
        else {
            for (let i = 0; i < this.departmentAddSelect.Programs.length; i++) {
                if (programOption === this.departmentAddSelect.Programs[i].Title) {
                    this.programAddSelect = this.departmentAddSelect.Programs[i];
                    this.programAddSelectBoolean = true;
                    this.batchesToDisplayFilter = new Array<Batch>();
                    this.batches.forEach(e => {
                        if (
                            this.departmentAddSelect.Name === e.Department &&
                            this.programAddSelect.Title === e.Program
                        ) this.batchesToDisplayFilter.push(new Batch(e));
                    });
                }
            }
        }
    }

    onBatchAddStudent(batchOption: String) {
        if (batchOption === 'Batch') this.batchAddSelectBoolean = false;
        else {
            this.spinner.show();
            this.api.getStudentsOfBatch({
                Department: this.departmentAddSelect.Name,
                Program: this.programAddSelect.Title,
                Session: batchOption.split('-')[0],
                Year: batchOption.split('-')[1],
                Group: false
            }).subscribe(
                (res: any) => {
                    this.students = new Array<Student>();
                    res.forEach(e => {
                        if (e.Group === false) this.students.push(new Student(e))
                    });
                    this.students.sort((a, b) => (a.RollNumber > b.RollNumber) ? 1 : ((b.RollNumber > a.RollNumber) ? -1 : 0));
                    this.batchAddSelectBoolean = true;
                    this.spinner.hide();
                }, (error: any) => { console.log(error); }
            );
        }
    }
}