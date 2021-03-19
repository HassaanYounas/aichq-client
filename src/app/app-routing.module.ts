import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { StudentRegPendingComponent } from './components/student/student-reg/student-reg-pending/student-reg-pending.component';
import { StudentRegComponent } from './components/student/student-reg/student-reg.component';
import { SuperAdminLoginComponent } from './components/super-admin/super-admin-login/super-admin-login.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { SupervisorDashboardComponent } from './components/supervisor/supervisor-dashboard/supervisor-dashboard.component';
import { SupervisorLoginComponent } from './components/supervisor/supervisor-login/supervisor-login.component';
import { TypeOfUserComponent } from './components/type-of-user/type-of-user.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DashboardGuardService } from './services/dashboard-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [DashboardGuardService] },
  { path: 'student/reg', component: StudentRegComponent, canActivate: [DashboardGuardService] },
  { path: 'student/reg/pending', component: StudentRegPendingComponent, canActivate: [DashboardGuardService] },
  { path: 'admin/login', component: AdminLoginComponent, canActivate: [DashboardGuardService] },
  { path: 'super/admin/login', component: SuperAdminLoginComponent, canActivate: [DashboardGuardService] },
  { path: 'student/login', component: StudentLoginComponent, canActivate: [DashboardGuardService] },
  { path: 'supervisor/login', component: SupervisorLoginComponent, canActivate: [DashboardGuardService] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService] },
  { path: 'student/dashboard', component: StudentDashboardComponent, canActivate: [AuthGuardService] },
  { path: 'supervisor/dashboard', component: SupervisorDashboardComponent, canActivate: [AuthGuardService] },
  { path: 'type', component: TypeOfUserComponent, canActivate: [DashboardGuardService] },
  { path: 'about', component: AboutComponent, canActivate: [DashboardGuardService] },
  { path: 'super/admin', component: SuperAdminComponent, canActivate: [AuthGuardService] },
  { path: '**', component: HomeComponent, canActivate: [DashboardGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
