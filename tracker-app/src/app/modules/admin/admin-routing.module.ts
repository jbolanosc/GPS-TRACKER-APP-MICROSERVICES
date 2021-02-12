import { ReportFormComponent } from './report-form/report-form.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
  },
  {
    path: 'reports',
    component: ReportTableComponent,
  },
  {
    path: 'report/:id',
    component: ReportFormComponent,
  },
  {
    path: 'report/add',
    component: ReportFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
