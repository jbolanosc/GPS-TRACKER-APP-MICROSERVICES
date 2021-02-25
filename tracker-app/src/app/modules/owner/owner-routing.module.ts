import { OwnerTableComponent } from './owner-table/owner-table.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OwnerTableComponent,
  },
  {
    path: 'create',
    component: OwnerFormComponent,
  },
  {
    path: ':id',
    component: OwnerFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerRoutingModule {}
