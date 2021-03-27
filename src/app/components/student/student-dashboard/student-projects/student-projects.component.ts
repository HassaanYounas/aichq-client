import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { Supervisor } from 'src/app/models/supervisor.model';
import { SupervisorProposal } from 'src/app/models/supervisor.proposal.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-projects',
  templateUrl: './student-projects.component.html'
})
export class StudentProjectsComponent implements OnInit {

    group: Group;
    supervisors: Supervisor[];
    supervisorProposals: SupervisorProposal[];

    currentProposalTitle: String;
    currentSupervisorName: String;
    currentSupervisorEmail: String;

    constructor(
        private api: ApiService
    ) { }

    ngOnInit(): void {
        this.api.getGroup({ _id: localStorage.getItem('id') }).subscribe(
            (res: any) => {
                this.group = new Group(res);
            }, (error: any) => { console.log(error); }
        );
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
        this.api.loadProposals({
            Program: localStorage.getItem('program'),
            Session: localStorage.getItem('session'),
            Year: localStorage.getItem('year'),
            Approved: 1
        }).subscribe(
            (res: any) => {
                this.supervisorProposals = new Array<SupervisorProposal>();
                res.forEach(e => this.supervisorProposals.push(new SupervisorProposal(e)));
                this.supervisors.forEach(e => {
                    e.setProposals(this.supervisorProposals);
                });
            }, (error: any) => { console.log(error); }
        );
    }

    setRequestData(email: String, name: String, title: String) {
        this.currentSupervisorName = name;
        this.currentProposalTitle = title;
        this.currentSupervisorEmail = email;
    }

    onRequestSupervision() {
        this.api.addSupervisionRequest({
            Department: localStorage.getItem('department'),
            ProposalTitle: this.currentProposalTitle,
            SupervisorEmail: this.currentSupervisorEmail,
            SupervisorName: this.currentSupervisorName,
            GroupID: localStorage.getItem('id'),
            Session: this.group.Session,
            Year: this.group.Year,
            Program: this.group.Program,
            StudentOneRollNumber: this.group.StudentOne.RollNumber,
            StudentTwoRollNumber: this.group.StudentTwo.RollNumber
        }).subscribe(
            (res: any) => {
                alert('Request successfully sent.');
            }, (error: any) => { alert(error); }
        );
    }
}