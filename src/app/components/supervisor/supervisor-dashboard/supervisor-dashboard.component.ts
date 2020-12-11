import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Batch } from 'src/app/models/batch.model';
import { Department } from 'src/app/models/department.model';
import { Supervisor } from 'src/app/models/supervisor.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html'
})
export class SupervisorDashboardComponent {

  departments: Department[];
  batches: Batch[];
  supervisor: Supervisor;

  toggle: Boolean = false;
  currentComponent: Number = 1;
  greetingMessage: String = '';

  constructor(
    private router: Router,
    private api: ApiService
  ) {
    if (localStorage.getItem('type') === 'Student') this.router.navigate(['/student/dashboard']);
    else if (localStorage.getItem('type') === 'Administrator') this.router.navigate(['/admin/dashboard']);
    this.api.getSupervisor({ _id: localStorage.getItem('id') }).subscribe(
      (res: any) => {
        this.supervisor = new Supervisor(res);
        this.greetingMessage = 'Welcome, ' + this.supervisor.FullName;
      }, (error: any) => { console.log(error); }
    );
    this.batches = new Array<Batch>();
    this.departments = new Array<Department>();
    this.getDepartments();
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

  getDepartments(): void {
    this.api.getDepartment().subscribe(
      (res: any) => {
        this.setDepartments(res);
        this.getBatches();
      }, (error: any) => { console.log(error); }
    );
  }

  getBatches(): void {
    this.api.getBatches().subscribe(
      (res: any) => {
        this.setBatches(res);
        this.departments.forEach(e => {
          e.setBatches(res);
        });
      }, (error: any) => { console.log(error); }
    );
  }

  setDepartments(res: any) {
    res.forEach(e => {
      let department = new Department();
      department.assignValues(e);
      this.departments.push(department);
    });
  }

  setBatches(res: any) {
    res.forEach(e => this.batches.push(new Batch(e)));
  }
}
