import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Admin } from '../models/admin.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as API from '../../assets/api.json';
import { Supervisor } from '../models/supervisor.model';
import { Group } from '../models/group.model';
import { SuperAdmin } from '../models/super.admin.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    updateAdmin(body: any) {
        return this.requestWithToken(body, API.updateAdmin);
    }

    updateSuperAdmin(body: any) {
        return this.requestWithToken(body, API.updateSuperAdmin);
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

    setMaxGroups(body: any) {
        return this.requestWithToken(body, API.setMaxGroups);
    }

    getNumberOfBatches(body: any) {
        return this.requestWithToken(body, API.getNumberOfBatches);
    }

    getAdmin() {
        return this.requestWithToken({}, API.getAdmin);
    }

    addSupervisionRequest(body: any) {
        return this.requestWithToken(body, API.addSupervisionRequest);
    }

    getSupervisionRequests(body: any) {
        return this.requestWithToken(body, API.getSupervisionRequests);
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

    assignSupervisor(body: any) {
        return this.requestWithToken(body, API.assignSupervisor);
    }

    addStudent(body: any) {
        return this.requestWithToken(body, API.addStudent);
    }

    getStudentsOfBatch(body: any) {
        return this.requestWithToken(body, API.getStudentsOfBatch);
    }

    addStudentsBulk(body: any) {
        return this.requestWithToken(body, API.addStudentsBulk);
    }

    getGroups() {
        return this.requestWithToken({}, API.getGroups);
    }

    getGroup(body: any) {
        return this.requestWithToken(body, API.getGroup);
    }

    getSupervisor(body: any) {
        return this.requestWithToken(body, API.getSupervisor);
    }

    updateSupervisorProposal(body: any) {
        return this.requestWithToken(body, API.updateSupervisorProposal);
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

    updateSupervisionRequest(body: any) {
        return this.requestWithToken(body, API.updateSupervisionRequest);
    }

    loadDepartments() {
        return this.requestWithToken({}, API.getDepartment);
    }

    loadBatches(body: any) {
        return this.requestWithToken(body, API.getBatches);
    }

    loadSupervisors(body: any) {
        return this.requestWithToken(body, API.getSupervisors);
    }

    loadStudents() {
        return this.requestWithToken({}, API.getStudents);
    }

    loadProposals(body: any) {
        return this.requestWithToken(body, API.getSupervisorProposals);
    }

    loadPrograms(body: any) {
        return this.requestWithToken(body, API.getPrograms);
    }

    loginAdmin(admin: Admin) {
        const url = API.loginAdmin;
        const body = { Email: admin.Email, Password: admin.Password };
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

    requestWithToken(body: any, url: any) {
        const headers = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
    }

    private errorHandler(error: HttpErrorResponse) {
        return throwError(error.error.message);
    }
}