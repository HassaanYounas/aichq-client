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

  adminLogin(admin: Admin) {
    const url = API.loginAdmin;
    const body = { Username: admin.Username, Password: admin.Password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers }).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
