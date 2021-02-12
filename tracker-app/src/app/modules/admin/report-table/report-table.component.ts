import { ReportService } from './../../../services/report-service/report-service.service';
import { Report } from './../../../models/Report';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit {
  reports: Report[] = [];
  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getReports().then((gps) => (this.reports = gps));
  }
}
