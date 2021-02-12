import { AuthService } from './../../services/auth-service/auth.service';
import { AppRoutingModule } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation/navigation.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [NavigationComponent, LandingComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [NavigationComponent, LandingComponent],
  providers: [AuthService],
})
export class LayoutModule {}
