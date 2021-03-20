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
    
    supervisor: Supervisor;

    toggle: Boolean = false;
    currentComponent: Number = 0;
    greetingMessage: String = '';

    constructor(
        private router: Router,
        private api: ApiService
    ) {
        if (localStorage.getItem('type') === 'Student') this.router.navigate(['/student/dashboard']);
        else if (localStorage.getItem('type') === 'Administrator') this.router.navigate(['/admin/dashboard']);
        else if (localStorage.getItem('type') === 'Super Administrator') this.router.navigate(['/super/admin']);
        this.api.getSupervisor({ _id: localStorage.getItem('id') }).subscribe(
            (res: any) => {
                this.supervisor = new Supervisor(res);
                this.greetingMessage = 'Welcome, ' + this.supervisor.FullName;
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
        this.router.navigate(['/supervisor/login']);
    }
}
