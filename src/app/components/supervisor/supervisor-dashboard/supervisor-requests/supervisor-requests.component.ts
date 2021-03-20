import { Component, OnInit } from '@angular/core';
import { SupervisorRequest } from 'src/app/models/supervisor.request.model';
import { ApiService } from 'src/app/services/api.service';

declare var moment: any;

@Component({
  selector: 'app-supervisor-requests',
  templateUrl: './supervisor-requests.component.html'
})
export class SupervisorRequestsComponent implements OnInit {

    requests: SupervisorRequest[];

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        this.api.getSupervisionRequests({ Email: localStorage.getItem('email') }).subscribe(
            (res: any) => {
                this.requests = new Array<SupervisorRequest>();
                res.forEach(e => {
                    this.requests.push(new SupervisorRequest(e));
                });
                console.log(this.requests);
            }, (error: any) => { console.log(error); }
        );

    }
}