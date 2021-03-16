import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {

    admin: Admin;

    toggle: Boolean = false;
    greetingMessage: String = '';
    currentComponent: Number = 3;

    constructor(
        private api: ApiService,
        private router: Router
    ) {
        if (localStorage.getItem('type') === 'Student') this.router.navigate(['/student/dashboard']);
        else if (localStorage.getItem('type') === 'Supervisor') this.router.navigate(['/supervisor/dashboard']);
        this.api.getAdmin().subscribe((res: any) => {
            this.admin = new Admin(res);
            this.greetingMessage = 'Welcome, ' + this.admin.FullName;
        }, (error: any) => { console.log(error); });
    }
    
    changeComponent(currentComponent: number) {
        this.currentComponent = currentComponent;
        this.closeMenu();
    }

    openMenu() {
        this.toggle = true;
    }

    closeMenu() {
        this.toggle = false;
    }

    signOut() {
        localStorage.clear();
        this.router.navigate(['/admin/login']);
    }
}