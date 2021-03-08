import { ReportService } from './../../../services/report-service/report-service.service';
import { Report } from './../../../models/Report';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit {
  reports: Report[] = [];

  first: number = 0;

  rows: number = 10;

  constructor(
    private reportService: ReportService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  private loadReports() {
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

  deleteReport(id: number): void {
    this.confirmationService.confirm({
      message: '¿Are you sure you want to delete this item?',
      accept: () => {
        this.reportService.deleteReport(id).subscribe(
          (res) => {
            console.log('HTTP response', res);
            this.showSuccess('Report deleted');
          },
          (err) => {
            console.log('HTTP Error', err);
            this.showError('Error deleting report');
          }
        );
      },
    });
  }

  private showSuccess(message: string) {
    this.toastr.success(message, 'Action Success');
  }

  private showError(message: string) {
    this.toastr.error(message, 'Action failed');
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.reports ? this.first === this.reports.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.reports ? this.first === 0 : true;
  }
}
