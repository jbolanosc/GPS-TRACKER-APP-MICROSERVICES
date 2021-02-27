import { AuthService } from './../auth-service/auth.service';
import { tokenGetter } from 'src/app/app.module';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../../models/Report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getReports(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.get(`${environment.REPORT_API}`, { headers: headers });
  }

  getReport(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.get(`${environment.REPORT_API}/${id}`, {
      headers: headers,
    });
  }

  createReport(report: Report): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    console.log(report);
    console.log(JSON.stringify(report));
    return this.http.post<any>(`${environment.REPORT_API}`, report, {
      headers: headers,
    });
  }

  updateReport(report: Report, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    console.log(report);
    console.log(JSON.stringify(report));
    return this.http.put<any>(`${environment.REPORT_API}/${id}`, report, {
      headers: headers,
    });
  }

  deleteReport(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.tokenGetter()}`,
    });
    return this.http.delete<any>(`${environment.REPORT_API}/${id}`, {
      headers: headers,
    });
  }
}
