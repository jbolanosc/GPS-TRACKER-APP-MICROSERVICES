import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserTableComponent } from './user-table/user-table.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [UserTableComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
