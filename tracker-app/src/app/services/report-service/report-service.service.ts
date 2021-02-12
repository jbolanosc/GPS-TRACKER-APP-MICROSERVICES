import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../../models/Report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getReports() {
    return this.http
      .get(`${environment.REPORT_API}`)
      .toPromise()
      .then((res: any) => <Report[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getReport(id: number) {
    return this.http
      .get(`${environment.REPORT_API}/${id}`)
      .toPromise()
      .then((res: any) => <Report>res.data)
      .then((data) => {
        return data;
      });
  }

  createReport(report: Report) {
    const headers = { ContentType: 'Application/json' };
    return this.http
      .post(`${environment.REPORT_API}`, JSON.parse(report.toString()), {
        headers,
      })
      .toPromise()
      .then((res: any) => <Report>res.data)
      .then((data) => {
        return data;
      });
  }

  updateReport(id: number, report: Report) {
    const headers = { ContentType: 'Application/json' };
    return this.http
      .put(`${environment.REPORT_API}/${id}`, JSON.parse(report.toString()), {
        headers,
      })
      .toPromise()
      .then((res: any) => <Report>res.data)
      .then((data) => {
        console.log(data);
      });
  }
}
