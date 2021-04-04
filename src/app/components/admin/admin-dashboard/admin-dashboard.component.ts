import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {

    elem: any;
    
    toggleMenuBoolean: Boolean = true;
    toggleFullScreenBoolean: Boolean = false;

    departmentName: String = '';
    greetingMessage: String = '';

    currentComponent: Number = 2;

    constructor(
        private api: ApiService,
        private router: Router,
        @Inject(DOCUMENT) document
    ) {
        if (localStorage.getItem('type') === 'Student') this.router.navigate(['/student/dashboard']);
        else if (localStorage.getItem('type') === 'Supervisor') this.router.navigate(['/supervisor/dashboard']);
        else if (localStorage.getItem('type') === 'Super Administrator') this.router.navigate(['/super/admin']);
        this.greetingMessage = localStorage.getItem('fullName');
        this.elem = document.documentElement;
        this.departmentName = `&nbsp;&nbsp;&nbsp;${localStorage.getItem('department')} Department`;
    }
    
    changeComponent(currentComponent: number) {
        this.currentComponent = currentComponent;
    }

    toggleMenu() {
        if (this.toggleMenuBoolean) document.getElementById('sidebar').style.marginLeft = '-18rem';
        else document.getElementById('sidebar').style.marginLeft = '0rem';
        this.toggleMenuBoolean = !this.toggleMenuBoolean;
    }

    signOut() {
        localStorage.clear();
        this.router.navigate(['/admin/login']);
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