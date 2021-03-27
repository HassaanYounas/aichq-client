import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-group',
  templateUrl: './student-group.component.html'
})
export class StudentGroupComponent implements OnInit {

    group: Group;

    groupLoaded: Boolean = false;

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        this.api.getGroup({ _id: localStorage.getItem('id') }).subscribe(
            (res: any) => {
                this.group = new Group(res);
                this.groupLoaded = true;
            }, (error: any) => { console.log(error); }
        );
    }
}