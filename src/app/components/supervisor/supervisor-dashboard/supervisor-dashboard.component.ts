import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
    
    elem: any;

    supervisor: Supervisor;

    toggleMenuBoolean: Boolean = true;
    toggleFullScreenBoolean: Boolean = false;

    toggle: Boolean = false;
    currentComponent: Number = 0;
    greetingMessage: String = '';

    constructor(
        private router: Router,
        private api: ApiService,
        @Inject(DOCUMENT) document
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
        this.elem = document.documentElement;
    }
    
    changeComponent(currentComponent: number): void {
        this.currentComponent = currentComponent;
    }

    toggleMenu() {
        if (this.toggleMenuBoolean) document.getElementById('sidebar').style.marginLeft = '-18rem';
        else document.getElementById('sidebar').style.marginLeft = '0rem';
        this.toggleMenuBoolean = !this.toggleMenuBoolean;
    }
    
    signOut(): void {
        localStorage.clear();
        this.router.navigate(['/supervisor/login']);
    }

    toggleFullScreen() {
        if (this.toggleFullScreen) this.openFullScreen();
        else this.closeFullScreen();
    }

    openFullScreen() {
        if (this.elem.requestFullscreen) this.elem.requestFullscreen();
        else if (this.elem.mozRequestFullScreen) this.elem.mozRequestFullScreen();
        else if (this.elem.webkitRequestFullscreen) this.elem.webkitRequestFullscreen();
        else if (this.elem.msRequestFullscreen) this.elem.msRequestFullscreen();
        this.toggleFullScreenBoolean = true;
    }

    closeFullScreen() {
        if (this.elem.exitFullscreen) this.elem.exitFullscreen();
        else if (this.elem.mozCancelFullScreen) this.elem.mozCancelFullScreen();
        else if (this.elem.webkitExitFullscreen) this.elem.webkitExitFullscreen();
        else if (this.elem.msExitFullscreen) this.elem.msExitFullscreen();
        this.toggleFullScreenBoolean = false;
    }
}
