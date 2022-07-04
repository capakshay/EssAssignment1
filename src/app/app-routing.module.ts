import { LeaveManagementComponent } from './Components/leave-management/leave-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { TimesheetComponent } from './Components/timesheet/timesheet.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'timesheet',
    component: TimesheetComponent,
  },
  {
    path: 'leaverequest',
    component: LeaveManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
