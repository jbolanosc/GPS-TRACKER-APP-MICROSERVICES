import { Observable } from 'rxjs';
import { Gps } from './../../models/Gps';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  constructor(private http: HttpClient) {}

  getAllGps() {
    return this.http
      .get(environment.GPS_API)
      .toPromise()
      .then((res: any) => <Gps[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getGps(id: number) {
    return this.http
      .get(`${environment.GPS_API}/${id}`)
      .toPromise()
      .then((res: any) => <Gps>res.data)
      .then((data) => {
        return data;
      });
  }

  createGps(gps: Gps): Observable<any> {
    console.log(gps);
    console.log(JSON.stringify(gps));
    return this.http.post<any>(`${environment.GPS_API}`, gps);
  }

  updateGps(gps: Gps, id: number): Observable<any> {
    console.log(gps);
    console.log(JSON.stringify(gps));
    return this.http.put<any>(`${environment.GPS_API}/${id}`, gps);
  }
}
