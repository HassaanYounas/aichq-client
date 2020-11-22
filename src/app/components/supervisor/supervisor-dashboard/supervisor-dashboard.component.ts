import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html'
})
export class SupervisorDashboardComponent {

  toggle: Boolean = false;
  currentComponent: Number = 0;
  greetingMessage: String = '';

  constructor(
    private router: Router
  ) {
    if (localStorage.getItem('type') === 'Student') this.router.navigate(['/student/dashboard']);
    else if (localStorage.getItem('type') === 'Administrator') this.router.navigate(['/admin/dashboard']);
  }
  
  changeComponent(currentComponent: number): void {
    this.currentComponent = currentComponent;
    this.closeMenu();
  }

  openMenu(): void {
    this.toggle = true;
  }

  closeMenu(): void {
    this.toggle = false;
  }

  signOut(): void {
    localStorage.clear();
    this.router.navigate(['/supervisor/login']);
  }
}
