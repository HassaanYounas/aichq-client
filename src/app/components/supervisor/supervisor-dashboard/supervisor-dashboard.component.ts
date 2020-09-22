import { Component } from '@angular/core';

@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html',
  styleUrls: ['./supervisor-dashboard.component.scss']
})
export class SupervisorDashboardComponent {

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
