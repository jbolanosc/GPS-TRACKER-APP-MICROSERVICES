import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GpsRoutingModule } from './gps-routing.module';
import { GpsFormComponent } from './gps-form/gps-form.component';
import { GpsTableComponent } from './gps-table/gps-table.component';
import { GpsService } from '../../services/gps-service/gps-service.service';

@NgModule({
  declarations: [GpsFormComponent, GpsTableComponent],
  imports: [
    CommonModule,
    GpsRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [GpsService],
})
export class GpsModule {}
