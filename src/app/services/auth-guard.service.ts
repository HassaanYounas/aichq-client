import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (
      localStorage.getItem('type') === 'Super Administrator' ||
      localStorage.getItem('type') === 'Administrator' ||
      localStorage.getItem('type') === 'Student' ||
      localStorage.getItem('type') === 'Supervisor'
    ) return true;
    this.router.navigateByUrl('/');
    return false;
  }
}