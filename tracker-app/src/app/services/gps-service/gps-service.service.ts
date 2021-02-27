import { AuthService } from './../auth-service/auth.service';
import { Observable } from 'rxjs';
import { Gps } from './../../models/Gps';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllGps(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.get(environment.GPS_API, { headers: headers });
  }

  getGps(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.get(`${environment.GPS_API}/${id}`, {
      headers: headers,
    });
  }

  createGps(gps: Gps): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    console.log(gps);
    console.log(JSON.stringify(gps));
    return this.http.post<any>(`${environment.GPS_API}`, gps, {
      headers: headers,
    });
  }

  updateGps(gps: Gps, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    console.log(gps);
    console.log(JSON.stringify(gps));
    return this.http.put<any>(`${environment.GPS_API}/${id}`, gps, {
      headers: headers,
    });
  }

  deleteGps(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.delete<any>(`${environment.GPS_API}/${id}`, {
      headers: headers,
    });
  }
}
