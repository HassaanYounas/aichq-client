import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { HomeComponent } from './components/home/home.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { StudentRegComponent } from './components/student/student-reg/student-reg.component';
import { SupervisorDashboardComponent } from './components/supervisor/supervisor-dashboard/supervisor-dashboard.component';
import { SupervisorLoginComponent } from './components/supervisor/supervisor-login/supervisor-login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DashboardGuardService } from './services/dashboard-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [DashboardGuardService] },
  { path: 'student/reg', component: StudentRegComponent, canActivate: [DashboardGuardService] },
  { path: 'admin/login', component: AdminLoginComponent, canActivate: [DashboardGuardService] },
  { path: 'student/login', component: StudentLoginComponent, canActivate: [DashboardGuardService] },
  { path: 'supervisor/login', component: SupervisorLoginComponent, canActivate: [DashboardGuardService] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService] },
  { path: 'student/dashboard', component: StudentDashboardComponent, canActivate: [AuthGuardService] },
  { path: 'supervisor/dashboard', component: SupervisorDashboardComponent, canActivate: [AuthGuardService] },
  { path: '**', component: HomeComponent, canActivate: [DashboardGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
