import { ConfirmationService } from 'primeng/api';
import { MarkerService } from './../../services/marker-service/marker.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GpsRoutingModule } from './gps-routing.module';
import { GpsFormComponent } from './gps-form/gps-form.component';
import { GpsTableComponent } from './gps-table/gps-table.component';
import { GpsService } from '../../services/gps-service/gps-service.service';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [GpsFormComponent, GpsTableComponent, MapComponent],
  imports: [
    CommonModule,
    GpsRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
  ],
  providers: [GpsService, MarkerService, ConfirmationService],
})
export class GpsModule {}
