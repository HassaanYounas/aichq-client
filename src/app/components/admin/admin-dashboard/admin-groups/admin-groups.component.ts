import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { Group } from 'src/app/models/group.model';
import { Program } from 'src/app/models/program.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html'
})
export class AdminGroupsComponent implements OnInit {

    groups: Group[];

    departmentFilterSelect: Department;
    programFilterSelect: Program;

    groupFilterSelectForm: FormGroup;

    programFilterSelectBoolean: Boolean = false;
    currentGroupsText: String = 'Select above options:';

    constructor(
        private api: ApiService
    ) { }

    ngOnInit(): void {
        this.groupFilterSelectForm = new FormGroup({
            Department: new FormControl('Department'),
            Program: new FormControl('Program'),
            Batch: new FormControl('Batch')
        });
        this.api.getGroups({ Department: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.groups = new Array<Group>();
                res.forEach(e => this.groups.push(new Group(e)));
            }, (error: any) => console.log(error)
        );
    }

    // onProgramSelectFilter(programOption: String): void {
    //     if (programOption === 'Program') this.programFilterSelectBoolean = false;
    //     else {
    //     for (let i = 0; i < this.departmentFilterSelect.Programs.length; i++) {
    //         if (programOption === this.departmentFilterSelect.Programs[i].Title) {
    //         this.programFilterSelect = this.departmentFilterSelect.Programs[i];
    //         this.programFilterSelectBoolean = true;
    //         }
    //     }
    //     }
    // }

    // onBatchSelectFilter(batchOption: String): void {
    //     if (batchOption !== 'Batch') {
    //     this.currentGroupsText = `FYP Groups of ${this.departmentFilterSelect.Name} department (${this.programFilterSelect.Title} ${batchOption}):`;
    //     }
    // }
}