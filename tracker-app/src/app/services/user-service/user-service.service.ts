import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  getUser(id: number) {
    return this.http
      .get(`${environment.USER_API}/${id}`)
      .toPromise()
      .then((res: any) => <User>res.data)
      .then((data) => {
        return data;
      });
  }
}
