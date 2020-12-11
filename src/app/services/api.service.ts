import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Admin } from '../models/admin.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as API from '../../assets/api.json';
import { Supervisor } from '../models/supervisor.model';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  updateAdmin(body: any) {
    return this.requestWithToken(body, API.updateAdmin);
  }

  getAdmin() {
    return this.requestWithToken({}, API.getAdmin);
  }

  addDepartment(body: any) {
    return this.requestWithToken(body, API.addDepartment);
  }

  getDepartment() {
    return this.requestWithToken({}, API.getDepartment);
  }

  addBatch(body: any) {
    return this.requestWithToken(body, API.addBatch);
  }
  
  getBatches() {
    return this.requestWithToken({}, API.getBatches);
  }

  addSupervisor(body: any) {
    return this.requestWithToken(body, API.addSupervisor);
  }
  
  addSupervisorsBulk(body: any) {
    return this.requestWithToken(body, API.addSupervisorsBulk);
  }

  getSupervisors() {
    return this.requestWithToken({}, API.getSupervisors);
  }

  registerGroup(body: any) {
    return this.requestWithToken(body, API.registerGroup);
  }

  addStudent(body: any) {
    return this.requestWithToken(body, API.addStudent);
  }
  
  getStudents() {
    return this.requestWithToken({}, API.getStudents);
  }

  getGroups() {
    return this.requestWithToken({}, API.getGroups);
  }

  getSupervisor(body: any) {
    return this.requestWithToken(body, API.getSupervisor);
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

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}