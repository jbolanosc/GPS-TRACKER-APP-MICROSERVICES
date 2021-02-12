import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const headers = { ContentType: 'Application/json' };
    return this.http
      .post<{ token: string }>(
        `${environment.USER_API}/login`,
        {
          username: username,
          password: password,
        },
        { headers }
      )
      .pipe(
        map((result) => {
          localStorage.setItem('access_token', result.token);
          console.log(result);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
