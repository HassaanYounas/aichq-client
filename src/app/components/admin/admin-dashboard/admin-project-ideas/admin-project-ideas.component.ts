import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { Supervisor } from 'src/app/models/supervisor.model';
import { SupervisorProposal } from 'src/app/models/supervisor.proposal.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-project-ideas',
  templateUrl: './admin-project-ideas.component.html'
})
export class AdminProjectIdeasComponent implements OnInit {

    supervisors: Supervisor[];
    supervisorProposals: SupervisorProposal[];

    currentProposalTitle: String;
    currentSupervisorEmail: String;

    constructor(
        private api: ApiService
    ) { }

    ngOnInit(): void {
        this.fetchSupervisors();
    }

    fetchSupervisors() {
        this.api.loadSupervisors({ Department: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.supervisors = new Array<Supervisor>();
                res.forEach(e => this.supervisors.push(new Supervisor(e)));
                this.fetchProposals();
            }, (error: any) => { console.log(error); }
        );
    }

    fetchProposals() {
        this.api.loadProposals({ Department: localStorage.getItem('department') }).subscribe(
            (res: any) => {
                this.supervisorProposals = new Array<SupervisorProposal>();
                res.forEach(e => this.supervisorProposals.push(new SupervisorProposal(e)));
                this.supervisors.forEach(e => {
                    e.setProposals(this.supervisorProposals);
                });
            }, (error: any) => { console.log(error); }
        );
    }

    setRequestData(email: String, title: String) {
        this.currentSupervisorEmail = email;
        this.currentProposalTitle = title;
    }

    onSupervisorIdeaApproval(id: String) {
        this.supervisorProposalUpdate(id, 1);
    }

    onSupervisorIdeaReject(id: String) {
        this.supervisorProposalUpdate(id, 0);
    }

    supervisorProposalUpdate(id: String, approval: Number) {
        this.api.updateSupervisorProposal({ _id: id, Approved: approval }).subscribe(
            (res: any) => {
                this.fetchProposals();
                if (approval == 1) alert('Proposal Accepted.');
                else alert('Proposal Rejected.');
            }, (error: any) => { alert(error); }
        );
    }
}