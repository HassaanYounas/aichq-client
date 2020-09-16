import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { HomeComponent } from './components/home/home.component';
import { StudentRegComponent } from './components/student/student-reg/student-reg.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { AdminFypBatchesComponent } from './components/admin/admin-dashboard/admin-fyp-batches/admin-fyp-batches.component';
import { AdminSupervisorsComponent } from './components/admin/admin-dashboard/admin-supervisors/admin-supervisors.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    HomeComponent,
    StudentRegComponent,
    StudentLoginComponent,
    AdminFypBatchesComponent,
    AdminSupervisorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
