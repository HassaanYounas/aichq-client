import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Admin } from '../models/admin.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as API from '../../assets/api.json';

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

  createBatch(body: any) {
    return this.requestWithToken(body, API.createBatch);
  }

  promoteBatch(body: any) {
    return this.requestWithToken(body, API.promoteBatch);
  }

  deleteBatch(body: any) {
    return this.requestWithToken(body, API.deleteBatch);
  }

  getBatches() {
    return this.requestWithToken({}, API.getBatches);
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

  deleteSupervisor(body: any) {
    return this.requestWithToken(body, API.deleteSupervisor);
  }

  getSupervisors() {
    return this.requestWithToken({}, API.getSupervisors);
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