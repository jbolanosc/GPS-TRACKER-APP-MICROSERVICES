import { AuthService } from './../../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };
  error: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  login() {
    console.log(this.user.email, this.user.password);
    this.auth
      .login(this.user.email, this.user.password)
      .pipe(first())
      .subscribe(
        (result) => this.router.navigate(['gps']),
        (err) => (this.error = 'Could not authenticate')
      );
  }
}
