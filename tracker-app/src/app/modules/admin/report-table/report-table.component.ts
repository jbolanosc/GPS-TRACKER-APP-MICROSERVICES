import { ReportService } from './../../../services/report-service/report-service.service';
import { Report } from './../../../models/Report';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit {
  reports: Report[] = [];
  constructor(
    private reportService: ReportService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reportService.getReports().subscribe(
      (res) => {
        console.log('HTTP response', res);
        this.reports = res.data;
        this.showSuccess('Reports loaded');
      },
      (err) => {
        console.log('HTTP Error', err);
        this.showError('Error loading reports');
      }
    );
  }

  private showSuccess(message: string) {
    this.toastr.success(message, 'Action Success');
  }

  private showError(message: string) {
    this.toastr.error(message, 'Action failed');
  }
}
