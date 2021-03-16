import { UserService } from './../../services/user-service/user-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { UserRoutingModule } from './user-routing.module';
import { UserTableComponent } from './user-table/user-table.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [UserTableComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ConfirmDialogModule,
  ],
  providers: [UserService, ConfirmationService],
})
export class UserModule {}
