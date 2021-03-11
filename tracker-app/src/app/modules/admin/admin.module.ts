import { OwnerService } from './../../services/owner-service/owner.service';
import { GpsService } from './../../services/gps-service/gps-service.service';
import { ReportService } from './../../services/report-service/report-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { ReportTableComponent } from './report-table/report-table.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReportChartsComponent } from './report-charts/report-charts.component';

@NgModule({
  declarations: [
    ReportTableComponent,
    ReportFormComponent,
    AdminDashboardComponent,
    ReportChartsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    TableModule,
    ChartModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
  ],
  providers: [ReportService, ConfirmationService, OwnerService, GpsService],
})
export class AdminModule {}
