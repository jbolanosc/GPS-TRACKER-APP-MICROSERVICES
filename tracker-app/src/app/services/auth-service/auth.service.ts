import { User } from './../../models/User';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): Observable<boolean> {
    return this.http.post<any>(`${environment.USER_API}/login`, user);
  }

  logout() {
    console.log('clearing local storage');
    localStorage.removeItem('access_token');
    window.localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
