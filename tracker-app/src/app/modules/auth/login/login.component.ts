import { User } from './../../../models/User';
import { AuthService } from './../../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = {
    id: 0,
    email: '',
    password: '',
    role: '',
  };
  error: string = '';

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.auth.login(this.user).subscribe(
      (res) => {
        console.log('HTTP response', res);
        this.showSuccess();
        this.router.navigate['gps'];
      },
      (err) => {
        console.log('HTTP Error', err);
        this.showError();
      }
    );
  }

  showSuccess() {
    this.toastr.success('Welcome', 'Login Success');
  }

  showError() {
    this.toastr.error('Invalid user or password', 'Login failed');
  }
}
