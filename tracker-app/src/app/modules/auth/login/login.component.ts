import { User } from './../../../models/User';
import { AuthService } from './../../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';

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
    createdAt: null,
    updatedAt: null,
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
        var decoded: any = jwt_decode(res.data);
        console.error('decorde', decoded);
        this.showSuccess('Welcome ' + decoded.email);
      },
      (err: any) => {
        this.showError(err.message);
      }
    );
  }

  showSuccess(message: string) {
    this.router.navigate(['gps']);
    this.toastr.success('Welcome', message);
  }

  showError(message: string) {
    this.toastr.error('Action Failed', message);
  }
}
