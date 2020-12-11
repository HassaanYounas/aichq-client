import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxCsvParserModule } from 'ngx-csv-parser';

import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { HomeComponent } from './components/home/home.component';
import { StudentRegComponent } from './components/student/student-reg/student-reg.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { AdminFypBatchesComponent } from './components/admin/admin-dashboard/admin-fyp-batches/admin-fyp-batches.component';
import { AdminSupervisorsComponent } from './components/admin/admin-dashboard/admin-supervisors/admin-supervisors.component';
import { AdminStudentsComponent } from './components/admin/admin-dashboard/admin-students/admin-students.component';
import { AdminSettingsComponent } from './components/admin/admin-dashboard/admin-settings/admin-settings.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { SupervisorDashboardComponent } from './components/supervisor/supervisor-dashboard/supervisor-dashboard.component';
import { SupervisorLoginComponent } from './components/supervisor/supervisor-login/supervisor-login.component';
import { AdminGroupsComponent } from './components/admin/admin-dashboard/admin-groups/admin-groups.component';
import { AdminNotificationsComponent } from './components/admin/admin-dashboard/admin-notifications/admin-notifications.component';
import { StudentRegPendingComponent } from './components/student/student-reg/student-reg-pending/student-reg-pending.component';
import { SupervisorProposalsComponent } from './components/supervisor/supervisor-dashboard/supervisor-proposals/supervisor-proposals.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    HomeComponent,
    StudentRegComponent,
    StudentLoginComponent,
    AdminFypBatchesComponent,
    AdminSupervisorsComponent,
    AdminStudentsComponent,
    AdminSettingsComponent,
    StudentDashboardComponent,
    SupervisorDashboardComponent,
    SupervisorLoginComponent,
    AdminGroupsComponent,
    AdminNotificationsComponent,
    StudentRegPendingComponent,
    SupervisorProposalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxCsvParserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }