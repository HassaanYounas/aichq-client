import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Batch } from 'src/app/models/batch.model';
import { Department } from 'src/app/models/department.model';
import { Program } from 'src/app/models/program.model';
import { Student } from 'src/app/models/student.model';
import { ApiService } from 'src/app/services/api.service';
import { InputValidationService } from 'src/app/services/input-validation.service';

declare const $: any;

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html'
})
export class AdminStudentsComponent implements OnInit {

    studentsCSV: File = null;

    batches: Batch[];
    students: Student[];
    programs: Program[];
    batchesToDisplay: Batch[];
    batchesToDisplayBulk: Batch[];
    batchesToDisplayFilter: Batch[];

    selectedFilterBatchYear: String = '';
    selectedFilterBatchSession: String = '';
    selectedFilterProgram: String = 'All Programs';

    oddBatches: String[];

    addStudentForm: FormGroup;
    addStudentBulkForm: FormGroup;
    studentFilterSelectForm: FormGroup;

    fileUploaded: Boolean = false;
    noFilterBoolean: Boolean = true;
    validAddStudent: Boolean = true;
    oddBatchesBoolean: Boolean = false;
    validAddStudentBulk: Boolean = true;
    tableBatchFilterBoolean: Boolean = false;
    programAddSelectBoolean: Boolean = false;
    tableProgramFilterBoolean: Boolean = false;
    programFilterSelectBoolean: Boolean = false;
    programAddBulkSelectBoolean: Boolean = false;

    fileName: String = 'Choose file';
    addStudentMessage: String = '';
    addStudentBulkMessage: String = '';

    nameSortAlternate: Number = 0;
    groupSortAlternate: Number = 0;
    batchSortAlternate: Number = 0;
    phaseSortAlternate: Number = 0;
    programSortAlternate: Number = 0;
    rollNumberSortAlternate: Number = 0;

    constructor(
        private spinner: NgxSpinnerService,
        private api: ApiService,
        private validate: InputValidationService,
        private ngxCsvParser: NgxCsvParser,
        @Inject(DOCUMENT) document
    ) { }

    ngOnInit(): void {
        this.addStudentForm = new FormGroup({
            FullName: new FormControl(''),
            RollNumber: new FormControl(''),
            Department: new FormControl(localStorage.getItem('department')),
            Program: new FormControl('Program'),
            Batch: new FormControl('Batch')
        });
        this.addStudentBulkForm = new FormGroup({
            Department: new FormControl(localStorage.getItem('department')),
            Program: new FormControl('Program'),
            Batch: new FormControl('Batch')
        });
        this.studentFilterSelectForm = new FormGroup({
            Department: new FormControl('All Departments'),
            Program: new FormControl('All Programs'),
            Batch: new FormControl('All Batches')
        });
        this.fetchBatches();
        this.fetchPrograms();
    }

    fetchPrograms() {
        this.api.loadPrograms({ Name: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.programs = new Array<Program>();
                res.forEach(e => this.programs.push(new Program(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    fetchBatches() {
        this.api.loadBatches({ Department: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.batches = new Array<Batch>();
                res.forEach(e => this.batches.push(new Batch(e)));
                this.fetchStudents();
            }, (error: any) => { console.log(error); }
        );
    }

    fetchStudents() {
        this.api.loadStudents({ Department: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.students = new Array<Student>();
                res.forEach(e => this.students.push(new Student(e)));
                this.oddBatches = new Array<String>();
                this.batches.forEach(e => {
                    let count = 0;
                    this.students.forEach(s => {
                        if (s.Session === e.Session && s.Year === e.Year) count++;
                    });
                    if (count % 2 !== 0) this.oddBatches.push(e.Program + '-' + e.Session + '-' + e.Year);
                });
                this.programs.forEach(p => {
                    let count = 0;
                    this.students.forEach(s => {
                        if (p.Title === s.Program) count++;
                    });
                    p.NumberOfStudents = count;
                });
                if (this.oddBatches.length !== 0) this.oddBatchesBoolean = true;
            }, (error: any) => { console.log(error); }
        );
    }

    onAddStudentFormSubmit(formData: any): void {
        if (
            this.validate.isAlphabetsOnly(formData.FullName) && 
            formData.RollNumber !== 0 &&
            formData.Department !== 'Department' &&  
            formData.Program !== 'Program' &&  
            formData.Batch !== 'Batch'
        ) {
            this.spinner.show();
            this.api.addStudent({
                Department: formData.Department,
                Program: formData.Program,
                Session: formData.Batch.split('-')[0],
                Year: formData.Batch.split('-')[1],
                FullName: formData.FullName,
                RollNumber: formData.RollNumber.toString()
            }).subscribe(
                (res: any) => {
                    this.addStudentResponse('Student added successfully.');
                    this.addStudentForm.controls['Batch'].setValue('Batch');
                    this.addStudentForm.controls['Program'].setValue('Program');
                    this.addStudentForm.controls['FullName'].setValue('');
                    this.addStudentForm.controls['RollNumber'].setValue('');
                    this.fetchStudents();
                    this.setMaxGroups(formData);
                }, (error: any) => this.addStudentResponse(error)
            );
            this.validAddStudent = true;
            setTimeout(() => this.addStudentMessage = '', 4000);
        } else this.validAddStudent = false;
    }

    addStudentResponse(message: String): void {
        setTimeout(() => { 
            this.spinner.hide();
            this.addStudentMessage = message;
        }, 1000);
    }
    
    onProgramAddStudent(programOption: String): void {
        if (programOption === 'Program') this.programAddSelectBoolean = false;
        else {
            this.programAddSelectBoolean = true;
            this.batchesToDisplay = new Array<Batch>();
            this.batches.forEach(e => {
                if (
                    localStorage.getItem('department') === e.Department &&
                    programOption === e.Program
                ) this.batchesToDisplay.push(new Batch(e));
            });
        }
    }
    
    onProgramAddStudentBulk(programOption: String): void {
        if (programOption === 'Program') this.programAddBulkSelectBoolean = false;
        else {
            this.programAddBulkSelectBoolean = true;
            this.batchesToDisplayBulk = new Array<Batch>();
            this.batches.forEach(e => {
                if (
                    localStorage.getItem('department') === e.Department &&
                    programOption === e.Program
                ) this.batchesToDisplayBulk.push(new Batch(e));
            });
        }
    }

    onProgramFilterSelect(programOption: String): void {
        if (programOption === 'All Programs') {
            this.programFilterSelectBoolean = false;
            this.setStudentFilters(true, false, false, '', '', '');
        } else {
            this.programFilterSelectBoolean = true;
            this.setStudentFilters(
                false, 
                true, 
                false, 
                programOption, 
                '', ''
            );
            this.batchesToDisplayFilter = new Array<Batch>();
            this.batches.forEach(e => {
                if (
                    localStorage.getItem('department') === e.Department &&
                    programOption === e.Program
                ) this.batchesToDisplayFilter.push(new Batch(e));
            });
        }
    }

    onBatchFilterSelect(batchOption: String): void {
        if (batchOption === 'All Batches') {
            this.setStudentFilters(
                false, 
                true, 
                false, 
                this.selectedFilterProgram, 
                '', ''
            );
        } else {
            this.setStudentFilters(
                false, 
                true, 
                true, 
                this.selectedFilterProgram, 
                batchOption.split('-')[0],
                batchOption.split('-')[1]
            );
        }
    }

    setStudentFilters(
        noFilterBoolean: Boolean, 
        tableProgramFilterBoolean: Boolean,
        tableBatchFilterBoolean: Boolean,
        selectedFilterProgram: String,
        selectedFilterBatchYear: String,
        selectedFilterBatchSession: String
    ) {
        this.noFilterBoolean = noFilterBoolean;
        this.tableProgramFilterBoolean = tableProgramFilterBoolean;
        this.tableBatchFilterBoolean = tableBatchFilterBoolean;
        this.selectedFilterProgram = selectedFilterProgram;
        this.selectedFilterBatchYear = selectedFilterBatchYear;
        this.selectedFilterBatchSession = selectedFilterBatchSession;
    }

    onAddStudentBulkFormSubmit(formData: any): void {
        if (
            formData.Department === 'Department' ||
            formData.Program === 'Program' ||
            formData.Batch === 'Batch' ||
            !this.fileUploaded
        ) this.validAddStudentBulk = false;
        else {
            this.validAddStudentBulk = true;
            this.ngxCsvParser.parse(this.studentsCSV, { header: true, delimiter: ',' })
                .pipe().subscribe((result: Array<any>) => {
                    const body = [];
                    for (let i = 0; i < result.length; i++) {
                        if (
                            'FullName' in result[i] &&
                            'RollNumber' in result[i]
                        ) {
                            body.push({
                                FullName: result[i].FullName,
                                RollNumber: result[i].RollNumber,
                                Department: formData.Department,
                                Program: formData.Program,
                                Session: formData.Batch.split('-')[0],
                                Year: formData.Batch.split('-')[1]
                            });
                        } else {
                            this.validAddStudentBulk = false;
                            return;
                        }
                    }
                    this.spinner.show();
                    this.api.addStudentsBulk(body).subscribe(
                        (res: any) => {
                            this.addStudentsBulkResponse('Students uploaded successfully.');
                            this.fetchStudents();
                            this.setMaxGroups(formData);
                        }, (error: any) => {
                            this.addStudentsBulkResponse(error);
                            this.fetchStudents();
                            this.setMaxGroups(formData);
                        }
                    );
                }, (error: NgxCSVParserError) => console.log(error));
            setTimeout(() => this.addStudentBulkMessage = '', 4000);
        }
    }

    setMaxGroups(formData) {
        this.api.setMaxGroups({
            Department: formData.Department,
            Program: formData.Program,
            Session: formData.Batch.split('-')[0],
            Year: formData.Batch.split('-')[1],
        }).subscribe((res: any) => {}, (error: any) => console.log(error));
    }

    addStudentsBulkResponse(message: String): void {
        setTimeout(() => { 
            this.spinner.hide();
            this.addStudentBulkMessage = message;
        }, 1000);
    }

    handleFileInput(files: FileList): void { 
        this.studentsCSV = files[0];
        this.fileName = this.studentsCSV.name;  
        this.fileUploaded = true;
    }

    sortByGroup() {
        if (this.groupSortAlternate === 1) {
            this.students.sort((a, b) => (a.Group > b.Group) ? 1 : ((b.Group > a.Group) ? -1 : 0));
            this.groupSortAlternate = 0;
        } else {
            this.students.sort((a, b) => (a.Group < b.Group) ? 1 : ((b.Group < a.Group) ? -1 : 0));
            this.groupSortAlternate = 1;
        }
    }

    sortByPhase() {
        if (this.phaseSortAlternate === 1) {
            this.students.sort((a, b) => (a.Phase > b.Phase) ? 1 : ((b.Phase > a.Phase) ? -1 : 0));
            this.phaseSortAlternate = 0;
        } else {
            this.students.sort((a, b) => (a.Phase < b.Phase) ? 1 : ((b.Phase < a.Phase) ? -1 : 0));
            this.phaseSortAlternate = 1;
        }
    }

    sortByProgram() {
        if (this.programSortAlternate === 1) {
            this.students.sort((a, b) => (a.Program > b.Program) ? 1 : ((b.Program > a.Program) ? -1 : 0));
            this.programSortAlternate = 0;
        } else {
            this.students.sort((a, b) => (a.Program < b.Program) ? 1 : ((b.Program < a.Program) ? -1 : 0));
            this.programSortAlternate = 1;
        }
    }

    sortByName() {
        if (this.nameSortAlternate === 1) {
            this.students.sort((a, b) => (a.FullName > b.FullName) ? 1 : ((b.FullName > a.FullName) ? -1 : 0));
            this.nameSortAlternate = 0;
        } else {
            this.students.sort((a, b) => (a.FullName < b.FullName) ? 1 : ((b.FullName < a.FullName) ? -1 : 0));
            this.nameSortAlternate = 1;
        }
    }

    sortByRollNumber() {
        if (this.rollNumberSortAlternate === 1) {
            this.students.sort((a, b) => (a.RollNumber > b.RollNumber) ? 1 : ((b.RollNumber > a.RollNumber) ? -1 : 0));
            this.rollNumberSortAlternate = 0;
        } else {
            this.students.sort((a, b) => (a.RollNumber < b.RollNumber) ? 1 : ((b.RollNumber < a.RollNumber) ? -1 : 0));
            this.rollNumberSortAlternate = 1;
        }
    }

    removeOddMessage() {
        document.getElementById('oddMessage').style.display = 'none';
    }
}