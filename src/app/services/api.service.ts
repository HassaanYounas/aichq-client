import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Admin } from '../models/admin.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as API from '../../assets/api.json';
import { Supervisor } from '../models/supervisor.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  loginAdmin(admin: Admin) {
    const url = API.loginAdmin;
    const body = { Username: admin.Username, Password: admin.Password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

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

  getSlimBatches() {
    return this.requestWithToken({}, API.getSlimBatches);
  }

  loginSupervisor(supervisor: Supervisor) {
    const url = API.loginSupervisor;
    const body = { Email: supervisor.Email, Password: supervisor.Password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  addSupervisorToBatch(body: any) {
    return this.requestWithToken(body, API.addSupervisorToBatch);
  }

  addStudentToBatch(body: any) {
    return this.requestWithToken(body, API.addStudentToBatch);
  }

  deleteStudentFromBatch(body: any) {
    return this.requestWithToken(body, API.deleteStudentFromBatch);
  }

  addSupervisor(body: any) {
    return this.requestWithToken(body, API.addSupervisor);
  }
  
  addSupervisorsBulk(body: any) {
    return this.requestWithToken(body, API.addSupervisorsBulk);
  }

  deleteSupervisor(body: any) {
    return this.requestWithToken(body, API.deleteSupervisor);
  }

  getSupervisors() {
    return this.requestWithToken({}, API.getSupervisors);
  }

  registerGroup(body: any) {
    return this.requestWithToken(body, API.registerGroup);
  }

  resendTokenGroup(body: any) {
    return this.requestWithToken(body, API.resendTokenGroup);
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