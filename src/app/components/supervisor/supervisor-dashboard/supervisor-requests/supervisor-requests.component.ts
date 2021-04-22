import { Component, OnInit } from '@angular/core';
import { SupervisorRequest } from 'src/app/models/supervisor.request.model';
import { ApiService } from 'src/app/services/api.service';

declare var moment: any;

@Component({
  selector: 'app-supervisor-requests',
  templateUrl: './supervisor-requests.component.html'
})
export class SupervisorRequestsComponent implements OnInit {

    requestsLoaded: Boolean = false;

    requests: SupervisorRequest[];

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        this.fetchRequests();
    }

    fetchRequests() {
        this.api.getSupervisionRequests({ 
            Department: localStorage.getItem('department'),
            Email: localStorage.getItem('email') 
        }).subscribe(
            (res: any) => {
                this.requests = new Array<SupervisorRequest>();
                res.forEach(e => {
                    this.requests.push(new SupervisorRequest(e));
                });
                this.requestsLoaded = true;
            }, (error: any) => { console.log(error); }
        );
    }

    updateSupervisionRequest(accepted: Number, id: String, program: String, session: String, year: String, groupID: String) {
        this.api.updateSupervisionRequest({
            GroupID: groupID,
            Department: localStorage.getItem('department'),
            Program: program,
            Session: session,
            Year: year,
            _id: id,
            Accepted: accepted
        }).subscribe(
            (res: any) => {
                this.fetchRequests();
                alert('Supervision request accepted.');
            }, (error: any) => console.log(error)
        );
    }
}