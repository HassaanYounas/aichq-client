import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { Batch } from 'src/app/models/batch.model';
import { Supervisor } from 'src/app/models/supervisor.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  admin: Admin;
  batches: Batch[];
  supervisors: Supervisor[];
  
  greetingMessage: string = '';
  toggle: boolean = false;
  currentComponent: number = 0;

  constructor(
    private api: ApiService,
    private router: Router
  ) {
    if (localStorage.getItem('type') === 'Student') this.router.navigate(['/student/dashboard']);
    else if (localStorage.getItem('type') === 'Supervisor') this.router.navigate(['/supervisor/dashboard']);
    this.api.getBatches().subscribe(
      (res: any) => {
        this.batches = new Array<Batch>();
        this.setBatches(res);
      }, (error: any) => { console.log(error); }
    );
    this.api.getAdmin().subscribe(
      (res: any) => {
        this.admin = new Admin();
        this.admin.FullName = res.FullName;
        this.admin.Username = res.Username;
        this.greetingMessage = 'Welcome, ' + this.admin.FullName;
      }, (error: any) => { console.log(error); }
    );
    this.api.getSupervisors().subscribe(
      (res: any) => {
        this.supervisors = new Array<Supervisor>();
        this.setSupervisors(res);
      }, (error: any) => { console.log(error); }
    );
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

  setBatches(res: any) {
    res.forEach(e => {
      let batch = new Batch();
      batch.assignValues(e);
      this.batches.push(batch);
    });
  }

  setSupervisors(res: any) {
    res.forEach(e => {
      let supervisor = new Supervisor();
      supervisor.assignValues(e);
      this.supervisors.push(supervisor);
    });
  }
}