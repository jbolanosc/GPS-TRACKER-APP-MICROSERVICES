import { User } from './../../models/User';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): Observable<boolean> {
    return this.http.post<any>(`${environment.USER_API}/login`, user);
  }

  logout() {
    localStorage.removeItem('access_token');
    window.localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }

  public get loggedIn(): boolean {
    return this.validateToken() ? true : false;
  }

  public tokenGetter() {
    return this.validateToken() ? localStorage.getItem('access_token') : false;
  }

  validateToken(): boolean {
    try {
      var decodedHeader = jwt_decode(localStorage.getItem('access_token'), {
        header: true,
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
