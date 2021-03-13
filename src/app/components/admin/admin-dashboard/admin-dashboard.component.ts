import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { Batch } from 'src/app/models/batch.model';
import { Department } from 'src/app/models/department.model';
import { Group } from 'src/app/models/group.model';
import { Student } from 'src/app/models/student.model';
import { Supervisor } from 'src/app/models/supervisor.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {

  admin: Admin;
  
  greetingMessage: String = '';
  toggle: Boolean = false;
  currentComponent: Number = 1;

  constructor(
    private api: ApiService,
    private router: Router
  ) {
    if (localStorage.getItem('type') === 'Student') this.router.navigate(['/student/dashboard']);
    else if (localStorage.getItem('type') === 'Supervisor') this.router.navigate(['/supervisor/dashboard']);
    this.api.getAdmin().subscribe(
      (res: any) => {
        this.admin = new Admin(res);
        this.greetingMessage = 'Welcome, ' + this.admin.FullName;
      }, (error: any) => { console.log(error); }
    );
    // this.batches = new Array<Batch>();
    // this.departments = new Array<Department>();
    // this.supervisors = new Array<Supervisor>();
    // this.students = new Array<Student>();
    // this.groups = new Array<Group>();

    // this.getSupervisors();
    // this.getStudents();
    // this.getGroups();
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
    this.router.navigate(['/admin/login']);
  }

  // getDepartments(): void {
  //   this.api.getDepartment().subscribe(
  //     (res: any) => {
  //       this.setDepartments(res);
  //       this.getBatches();
  //     }, (error: any) => { console.log(error); }
  //   );
  // }

  // getSupervisors(): void {
  //   this.api.getSupervisors().subscribe(
  //     (res: any) => {
  //       this.setSupervisors(res);
  //       this.departments.forEach(e => {
  //         e.setSupervisors(res);
  //       });
  //     }, (error: any) => { console.log(error); }
  //   );
  // }

  // getBatches(): void {
  //   this.api.getBatches().subscribe(
  //     (res: any) => {
  //       this.setBatches(res);
  //       this.departments.forEach(e => {
  //         e.setBatches(res);
  //       });
  //     }, (error: any) => { console.log(error); }
  //   );
  // }

  // getStudents(): void {
  //   this.api.getStudents().subscribe(
  //     (res: any) => this.setStudents(res),
  //     (error: any) => { console.log(error); }
  //   );
  // }

  // getGroups(): void {
  //   this.api.getGroups().subscribe(
  //     (res: any) => this.setGroups(res),
  //     (error: any) => { console.log(error); }
  //   );
  // }

  // setDepartments(res: any) {
  //   res.forEach(e => {
  //     let department = new Department();
  //     department.assignValues(e);
  //     this.departments.push(department);
  //   });
  // }

  // setSupervisors(res: any) {
  //   res.forEach(e => {
  //     let supervisor = new Supervisor(e);
  //     this.supervisors.push(supervisor);
  //   });
  // }

  // setBatches(res: any) {
  //   res.forEach(e => this.batches.push(new Batch(e)));
  // }

  // setStudents(res: any) {
  //   res.forEach(e => this.students.push(new Student(e)));
  // }

  // setGroups(res: any) {
  //   res.forEach(e => this.groups.push(new Group(e)));
  // }

  // updateData(update: any): void {
  //   this.departments = [];
  //   this.batches = [];
  //   this.getDepartments();
  //   this.getSupervisors();
  // }
}