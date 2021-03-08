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

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.auth.login(this.user).subscribe(
      (res: any) => {
        console.log('HTTP response', res);
        localStorage.setItem('access_token', res.data);
        this.showSuccess();
      },
      (err: any) => {
        console.log('HTTP Error', err);
        this.showError();
      }
    );
  }

  showSuccess() {
    this.router.navigate(['gps']);
    this.toastr.success('Welcome', 'Login Success');
  }

  showError() {
    this.toastr.error('Invalid user or password', 'Login failed');
  }
}
