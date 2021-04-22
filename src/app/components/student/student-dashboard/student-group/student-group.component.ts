import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-group',
  templateUrl: './student-group.component.html'
})
export class StudentGroupComponent implements OnInit {

    group: Group;

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        
       
    }
}