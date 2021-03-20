import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html'
})
export class StudentDashboardComponent {

    toggle: boolean = false;
    currentComponent: number = 0;
    greetingMessage: String = '';

    constructor(
        private router: Router
    ) {
        if (localStorage.getItem('type') === 'Administrator') this.router.navigate(['/admin/dashboard']);
        else if (localStorage.getItem('type') === 'Supervisor') this.router.navigate(['/supervisor/dashboard']);
        else if (localStorage.getItem('type') === 'Super Administrator') this.router.navigate(['/super/admin']);
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
        this.router.navigate(['/student/login']);
    }
}