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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'student/dashboard', component: StudentDashboardComponent },
  { path: 'student/reg', component: StudentRegComponent },
  { path: 'student/login', component: StudentLoginComponent },
  { path: 'supervisor/dashboard', component: SupervisorDashboardComponent },
  { path: 'supervisor/login', component: SupervisorLoginComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
