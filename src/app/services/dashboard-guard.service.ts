import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardService {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('type') === 'Administrator') {
      this.router.navigate(['/admin/dashboard']);
      return false;
    } else if (localStorage.getItem('type') === 'Student') {
      this.router.navigate(['/student/dashboard']);
      return false;
    } else if (localStorage.getItem('type') === 'Supervisor') {
      this.router.navigate(['/supervisor/dashboard']);
      return false;
    } return true;
  }
}