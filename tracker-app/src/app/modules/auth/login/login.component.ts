import { User } from './../../../models/User';
import { AuthService } from './../../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  login() {
    this.auth.login(this.user).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('access_token', data.data);
      this.router.navigate(['gps']);
    });
  }
}
