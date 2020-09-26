import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent {

  toggle: boolean = false;
  currentComponent: number = 2;

  constructor(
    private router: Router
  ) {
    if (localStorage.getItem('type') === 'Administrator') this.router.navigate(['/admin/dashboard']);
    else if (localStorage.getItem('type') === 'Supervisor') this.router.navigate(['/supervisor/dashboard']);
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
