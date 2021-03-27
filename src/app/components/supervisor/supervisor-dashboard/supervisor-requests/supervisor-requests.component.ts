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
        this.api.getSupervisionRequests({ Email: localStorage.getItem('email') }).subscribe(
            (res: any) => {
                this.requests = new Array<SupervisorRequest>();
                res.forEach(e => {
                    this.requests.push(new SupervisorRequest(e));
                });
                this.requestsLoaded = true;
            }, (error: any) => { console.log(error); }
        );
    }

    updateSupervisionRequest(approved: Number, id: String) {
        this.api.updateSupervisionRequest({ 
            _id: id,
            Approved: approved
        }).subscribe(
            (res: any) => {
                this.fetchRequests();
                alert('Supervision request accepted.');
            }, (error: any) => console.log(error)
        );
    }
}