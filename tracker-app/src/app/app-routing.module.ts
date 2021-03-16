import { AuthGuard } from './guard/auth.guard';
import { LandingComponent } from './modules/layout/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'owner',
        loadChildren: './modules/owner/owner.module#OwnerModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'gps',
        loadChildren: './modules/gps/gps.module#GpsModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        loadChildren: './modules/admin/admin.module#AdminModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule',
      },
      {
        path: 'user',
        loadChildren: './modules/user/user.module#UserModule',
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
