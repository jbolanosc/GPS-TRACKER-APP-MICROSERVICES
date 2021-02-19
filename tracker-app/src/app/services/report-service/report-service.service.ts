import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../../models/Report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getReports(): Observable<any> {
    return this.http.get(`${environment.REPORT_API}`);
  }

  getReport(id: number): Observable<any> {
    return this.http.get(`${environment.REPORT_API}/${id}`);
  }

  createReport(report: Report): Observable<any> {
    console.log(report);
    console.log(JSON.stringify(report));
    return this.http.post<any>(`${environment.REPORT_API}`, report);
  }

  updateReport(report: Report, id: number): Observable<any> {
    console.log(report);
    console.log(JSON.stringify(report));
    return this.http.put<any>(`${environment.REPORT_API}/${id}`, report);
  }
}
