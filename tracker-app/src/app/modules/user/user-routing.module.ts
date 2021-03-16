import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserTableComponent } from './user-table/user-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserTableComponent,
  },
  {
    path: 'create',
    component: UserProfileComponent,
  },
  {
    path: ':id',
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
