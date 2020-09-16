import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  toggle: boolean = false;
  currentComponent: number = 1;

  constructor() { }

  ngOnInit(): void { }

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
