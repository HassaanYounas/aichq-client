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

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private batches: Batch[];
  private departments: Department[];

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

  getDepartment() {
    return this.requestWithToken({}, API.getDepartment);
  }

  addBatch(body: any) {
    return this.requestWithToken(body, API.addBatch);
  }



  // Getter functions

  getAdmin() {
    return this.requestWithToken({}, API.getAdmin);
  }

  getDepartments() {
    return this.departments;
  }

  getBatches() {
    return this.batches;
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

  loadDepartments() {
    this.departments = new Array<Department>();
    this.requestWithToken({}, API.getDepartment).subscribe(
      (res: any) => {
        res.forEach(e => this.departments.push(new Department(e)));
      }, (error: any) => { console.log(error); }
    );
  }

  loadBatches() {
    this.batches = new Array<Batch>();
    this.requestWithToken({}, API.getBatches).subscribe(
      (res: any) => {
        res.forEach(e => this.batches.push(new Batch(e)));
      }, (error: any) => { console.log(error); }
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}