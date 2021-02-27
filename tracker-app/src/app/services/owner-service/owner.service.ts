import { AuthService } from './../auth-service/auth.service';
import { Observable } from 'rxjs';
import { Owner } from './../../models/Owner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllOwners(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.get(environment.OWNER_API, { headers: headers });
  }

  getOwner(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.get(`${environment.OWNER_API}/${id}`, {
      headers: headers,
    });
  }

  createOwner(owner: Owner): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    console.log(owner);
    console.log(JSON.stringify(owner));
    return this.http.post<any>(`${environment.OWNER_API}`, owner, {
      headers: headers,
    });
  }

  updateOwner(owner: Owner, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    console.log(owner);
    console.log(JSON.stringify(owner));
    return this.http.put<any>(`${environment.OWNER_API}/${id}`, owner, {
      headers: headers,
    });
  }

  deleteOwner(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.delete<any>(`${environment.OWNER_API}/${id}`, {
      headers: headers,
    });
  }
}
