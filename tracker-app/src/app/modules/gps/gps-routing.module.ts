import { GpsFormComponent } from './gps-form/gps-form.component';
import { GpsTableComponent } from './gps-table/gps-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GpsTableComponent,
  },
  {
    path: 'create',
    component: GpsFormComponent,
  },
  {
    path: ':id',
    component: GpsFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GpsRoutingModule {}
