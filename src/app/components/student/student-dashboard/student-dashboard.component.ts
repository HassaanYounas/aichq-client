import { Component } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent {

  toggle: boolean = false;
  currentComponent: number = 2;

  constructor() { }
  
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
