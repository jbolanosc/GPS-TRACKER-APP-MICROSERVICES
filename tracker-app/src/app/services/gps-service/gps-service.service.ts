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

  createGps(gps: Gps) {
    const headers = { ContentType: 'Application/json' };
    return this.http
      .post(`${environment.GPS_API}`, JSON.parse(gps.toString()), { headers })
      .toPromise()
      .then((res: any) => <Gps>res.data)
      .then((data) => {
        return data;
      });
  }

  updateGps(gps: Gps, id: number) {
    const headers = { ContentType: 'Application/json' };
    return this.http
      .put(`${environment.GPS_API}/${id}`, JSON.parse(gps.toString()), {
        headers,
      })
      .toPromise()
      .then((res: any) => <Gps>res.data)
      .then((data) => {
        console.log(data);
      });
  }
}
