import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Batch } from 'src/app/models/batch.model';
import { Program } from 'src/app/models/program.model';
import { ApiService } from 'src/app/services/api.service';

declare const $: any;

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html'
})
export class AdminMainComponent implements OnInit {

    announcementFile: File = null;

    batches: Batch[];
    programs: Program[];
    batchesToDisplay: Batch[];

    addAnnouncementForm: FormGroup;

    currentDepartment: String;
    programAddSelectBoolean: Boolean = false;

    constructor(
        private api: ApiService,
        @Inject(DOCUMENT) document
    ) {}

    ngOnInit(): void {
        $('.custom-file-input').on('change', function() {
            let fileName = $(this).val().split('\\').pop();
            $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
        });
        this.addAnnouncementForm = new FormGroup({
            Title: new FormControl(''),
            Body: new FormControl(''),
            Program: new FormControl('Program'),
            Batch: new FormControl('Batch')
        });
        this.currentDepartment = localStorage.getItem('department');
        this.fetchPrograms();
        this.fetchBatches();
    }

    handleFileInput(files: FileList): void { 
        this.announcementFile = files[0];
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
            }, (error: any) => { console.log(error); }
        );
    }

    onProgramAddAnnouncement(programOption: String): void {
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

    onAddAnnouncementFormSubmit(formData: any) {
        const body: any = new FormData();
        body.append('Department', localStorage.getItem('department'));
        body.append('Program', formData.Program);
        body.append('Batch', formData.Batch);
        body.append('Title', formData.Title);
        body.append('Body', formData.Body);
        body.append('Filename', this.announcementFile.name);
        body.append('File', this.announcementFile);
        this.api.addAnnoucement(body).subscribe(
            (res: any) => {
                console.log(res);
            }, (error: any) => { console.log(error); }
        );
    }
}