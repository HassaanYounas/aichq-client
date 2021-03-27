import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-supervisor-requests',
  templateUrl: './admin-supervisor-requests.component.html'
})
export class AdminSupervisorRequestsComponent implements OnInit {

    // requestsLoaded: Boolean = false;

    // requests: SupervisorRequest[];

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        // this.fetchRequests();
    }

    // fetchRequests() {
    //     this.api.getSupervisionRequests({ Department: localStorage.getItem('department') }).subscribe(
    //         (res: any) => {
    //             this.requests = new Array<SupervisorRequest>();
    //             res.forEach(e => {
    //                 if (e.Approved === -1) this.requests.push(new SupervisorRequest(e));
    //             });
    //             this.requestsLoaded = true;
    //         }, (error: any) => { console.log(error); }
    //     );
    // }

    // updateSupervisionRequest(approved: Number, id: String) {
    //     this.api.updateSupervisionRequest({ 
    //         _id: id,
    //         Approved: approved
    //     }).subscribe(
    //         (res: any) => {
    //             this.fetchRequests();
    //             alert('Supervision request approved.');
    //         }, (error: any) => console.log(error)
    //     );
    // }
}