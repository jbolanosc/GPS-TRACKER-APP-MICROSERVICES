import { ReportService } from './../../services/report-service/report-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { ReportTableComponent } from './report-table/report-table.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    ReportTableComponent,
    ReportFormComponent,
    AdminDashboardComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, TableModule],
  providers: [ReportService],
})
export class AdminModule {}
