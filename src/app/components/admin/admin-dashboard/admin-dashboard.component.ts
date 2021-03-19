import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {

    toggle: Boolean = false;
    greetingMessage: String = '';
    topText: String = '';
    currentComponent: Number = 2;

    constructor(
        private api: ApiService,
        private router: Router
    ) {
        if (localStorage.getItem('type') === 'Student') this.router.navigate(['/student/dashboard']);
        else if (localStorage.getItem('type') === 'Supervisor') this.router.navigate(['/supervisor/dashboard']);
        else if (localStorage.getItem('type') === 'Super Administrator') this.router.navigate(['/super/admin']);
        this.greetingMessage = 'Welcome, ' + localStorage.getItem('fullName');
        this.topText = 
            `Aich<span class="color-red">Q</span> | ${localStorage.getItem('department')} Administrator`;
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