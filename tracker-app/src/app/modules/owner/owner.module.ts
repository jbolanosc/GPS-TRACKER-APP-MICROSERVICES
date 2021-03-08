import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { OwnerService } from './../../services/owner-service/owner.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import { OwnerTableComponent } from './owner-table/owner-table.component';

@NgModule({
  declarations: [OwnerFormComponent, OwnerTableComponent],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
  ],
  providers: [OwnerService, ConfirmationService],
})
export class OwnerModule {}
