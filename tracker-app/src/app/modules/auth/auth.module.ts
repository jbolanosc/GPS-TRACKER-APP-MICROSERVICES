import { AuthService } from './../../services/auth-service/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [RegisterComponent, LoginComponent],
  providers: [AuthService],
})
export class AuthModule {}
