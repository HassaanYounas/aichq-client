import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Admin } from '../models/admin.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as API from '../../assets/api.json';
import { Supervisor } from '../models/supervisor.model';
import { Group } from '../models/group.model';
import { Batch } from '../models/batch.model';
import { Department } from '../models/department.model';
import { Student } from '../models/student.model';
import { SupervisorProposal } from '../models/supervisor.proposal.model';
import { Program } from '../models/program.model';
import { SuperAdmin } from '../models/super.admin.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private batches: Batch[];
    private programs: Program[];
    private students: Student[];
    private departments: Department[];
    private supervisors: Supervisor[];
    private proposals: SupervisorProposal[];

    constructor(private http: HttpClient) { }

    updateAdmin(body: any) {
        return this.requestWithToken(body, API.updateAdmin);
    }

    addDepartment(body: any) {
        return this.requestWithToken(body, API.addDepartment);
    }

    addProgram(body: any) {
        return this.requestWithToken(body, API.addProgram);
    }

    addBatch(body: any) {
        return this.requestWithToken(body, API.addBatch);
    }

    getAdmin() {
        return this.requestWithToken({}, API.getAdmin);
    }

    getDepartments() {
        return this.departments;
    }

    getBatches() {
        return this.batches;
    }

    getSupervisors() {
        return this.supervisors;
    }

    getStudents() {
        return this.students;
    }

    getProposals() {
        return this.proposals;
    }

    getPrograms() {
        return this.programs;
    }


    addSupervisor(body: any) {
        return this.requestWithToken(body, API.addSupervisor);
    }

    addSupervisorsBulk(body: any) {
        return this.requestWithToken(body, API.addSupervisorsBulk);
    }

    registerGroup(body: any) {
        return this.requestWithToken(body, API.registerGroup);
    }

    addStudent(body: any) {
        return this.requestWithToken(body, API.addStudent);
    }

    addStudentsBulk(body: any) {
        return this.requestWithToken(body, API.addStudentsBulk);
    }

    getGroups() {
        return this.requestWithToken({}, API.getGroups);
    }

    getSupervisor(body: any) {
        return this.requestWithToken(body, API.getSupervisor);
    }

    setSupervisorActive(body: any) {
        return this.requestWithToken(body, API.setSupervisorActive);
    }

    setSupervisorInactive(body: any) {
        return this.requestWithToken(body, API.setSupervisorInactive);
    }

    submitSupervisorProposal(body: any) {
        return this.requestWithToken(body, API.submitSupervisorProposal);
    }

    requestWithToken(body: any, url: any) {
        const headers = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
    }

    loginAdmin(admin: Admin) {
        const url = API.loginAdmin;
        const body = { Username: admin.Username, Password: admin.Password };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
    }

    loginSuperAdmin(superAdmin: SuperAdmin) {
        const url = API.loginSuperAdmin;
        const body = { Username: superAdmin.Username, Password: superAdmin.Password };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
    }

    loginSupervisor(supervisor: Supervisor) {
        const url = API.loginSupervisor;
        const body = { Email: supervisor.Email, Password: supervisor.Password };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
    }

    loginGroup(group: Group) {
        const url = API.loginGroup;
        const body = { Username: group.Username, Password: group.Password };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
    }

    loadDepartments() {
        this.departments = new Array<Department>();
        this.requestWithToken({}, API.getDepartment).subscribe(
            (res: any) => {
                res.forEach(e => this.departments.push(new Department(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    loadBatches(body: any) {
        this.batches = new Array<Batch>();
        this.requestWithToken(body, API.getBatches).subscribe(
            (res: any) => {
                res.forEach(e => this.batches.push(new Batch(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    loadSupervisors(body: any) {
        this.supervisors = new Array<Supervisor>();
        this.requestWithToken(body, API.getSupervisors).subscribe(
            (res: any) => {
                res.forEach(e => this.supervisors.push(new Supervisor(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    loadStudents() {
        this.students = new Array<Student>();
        this.requestWithToken({}, API.getStudents).subscribe(
            (res: any) => {
                res.forEach(e => this.students.push(new Student(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    loadProposals(body: any) {
        this.proposals = new Array<SupervisorProposal>();
        this.requestWithToken(body, API.getSupervisorProposals).subscribe(
            (res: any) => {
                res.forEach(e => this.proposals.push(new SupervisorProposal(e)));
            }, (error: any) => { console.log(error); }
        );
    }

    loadPrograms(body: any) {
        this.programs = new Array<Program>();
        this.requestWithToken(body, API.getPrograms).subscribe(
            (res: any) => {
                res.forEach(e => this.programs.push(new Program(e.Title)));
            }, (error: any) => { console.log(error); }
        );
    }

    private errorHandler(error: HttpErrorResponse) {
        return throwError(error.error.message);
    }
}