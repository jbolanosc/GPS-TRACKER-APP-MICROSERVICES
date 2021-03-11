import { Component, OnInit } from '@angular/core';
import { ReportService } from './../../../services/report-service/report-service.service';
import { Report } from './../../../models/Report';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-charts',
  templateUrl: './report-charts.component.html',
  styleUrls: ['./report-charts.component.scss'],
})
export class ReportChartsComponent implements OnInit {
  reports: Report[] = [];
  data: any;
  options: any;

  constructor(
    private reportService: ReportService,
    private toastr: ToastrService
  ) {
    this.options = {
      title: {
        display: true,
        text: 'REPORT TYPES',
        fontSize: 16,
      },
      legend: {
        position: 'bottom',
      },
    };
  }

  ngOnInit(): void {
    this.loadReports();
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'LOST',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 10, 0, 0, 0, 0],
        },
        {
          label: 'THIEFT',
          backgroundColor: '#CD3413',
          borderColor: '#7CB342',
          data: [28, 48, 8, 0, 0, 0, 0],
        },
      ],
    };
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
        this.showError('Error loading reports: ' + err);
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
