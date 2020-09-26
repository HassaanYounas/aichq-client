import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html',
  styleUrls: ['./supervisor-dashboard.component.scss']
})
export class SupervisorDashboardComponent {

  toggle: boolean = false;
  currentComponent: number = 2;

  constructor(
    private router: Router
  ) {
    if (localStorage.getItem('type') === 'Student') this.router.navigate(['/student/dashboard']);
    else if (localStorage.getItem('type') === 'Administrator') this.router.navigate(['/admin/dashboard']);
  }
  
  
  changeComponent(currentComponent: number): void {
    this.currentComponent = currentComponent;
  }

  openMenu(): void {
    this.toggle = true;
  }

  closeMenu(): void {
    this.toggle = false;
  }
}
