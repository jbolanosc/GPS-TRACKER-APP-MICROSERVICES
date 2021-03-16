import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './../auth-service/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.get(`${environment.USER_API}/${id}`, {
      headers: headers,
    });
  }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.get(environment.USER_API, { headers: headers });
  }

  createUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.post<any>(`${environment.USER_API}`, user, {
      headers: headers,
    });
  }

  updateUser(id: number, user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.put<any>(`${environment.USER_API}/${id}`, user, {
      headers: headers,
    });
  }

  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.delete<any>(`${environment.USER_API}/${id}`, {
      headers: headers,
    });
  }
}
