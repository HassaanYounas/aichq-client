import { Component, OnInit } from '@angular/core';
import { SupervisorRequest } from 'src/app/models/supervisor.request.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-requests',
  templateUrl: './student-requests.component.html'
})
export class StudentRequestsComponent implements OnInit {

    requestsLoaded: Boolean = false;

    requests: SupervisorRequest[];

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        this.fetchRequests();
    }

    fetchRequests() {
        this.api.getSupervisionRequests({ GroupID: localStorage.getItem('id') }).subscribe(
            (res: any) => {
                this.requests = new Array<SupervisorRequest>();
                res.forEach(e => {
                    this.requests.push(new SupervisorRequest(e));
                });
                this.requestsLoaded = true;
            }, (error: any) => { console.log(error); }
        );
    }

    assignSupervisor(supervisorEmail: String, proposalTitle: String) {
        // console.log(localStorage.getItem('id'))
        this.api.assignSupervisor({ 
            _id: localStorage.getItem('id'),
            SupervisorEmail: supervisorEmail,
            ProposalTitle: proposalTitle
        }).subscribe(
            (res: any) => {
                this.fetchRequests();
                alert('Congratulations! Your supervisor has been assigned.');
            }, (error: any) => { console.log(error); }
        );
    }
}