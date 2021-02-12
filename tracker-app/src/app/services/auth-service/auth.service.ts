import { User } from './../../models/User';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<boolean> {
    return this.http.post<any>(`${environment.USER_API}/login`, user);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.clear();
    window.localStorage.clear();
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
