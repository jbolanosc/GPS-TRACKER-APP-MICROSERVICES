import { ReportService } from './../../../services/report-service/report-service.service';
import { Report } from './../../../models/Report';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {
  edit: boolean = false;
  param: number = 0;
  types = [
    { id: 1, label: 'THIEFT' },
    { id: 2, label: 'LOST' },
  ];
  report: Report = {
    id: 0,
    type: '',
    description: '',
    gps: 0,
    owner: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loadReport() {
    if (this.param !== 0 && this.param != undefined && !isNaN(this.param)) {
      this.report.id = this.param;
      this.reportService.getReport(this.report.id).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.report = res.data;
          this.showSuccess('Report loaded');
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error loading gps');
        }
      );
    }
  }

  saveReport() {
    console.log(this.report);
    if (this.edit) {
      this.reportService.updateReport(this.report, this.report.id).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.showSuccess('Report updated');
          this.router.navigate['admin/report'];
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error updating report');
        }
      );
    } else {
      this.reportService.createReport(this.report).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.showSuccess('Report updated');
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error updating report');
        }
      );
    }
    this.router.navigate(['admin/reports']);
  }

  ngOnInit(): void {
    this.param = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadReport();
  }

  private showSuccess(message: string) {
    this.toastr.success(message, 'Action Success');
  }

  private showError(message: string) {
    this.toastr.error(message, 'Action failed');
  }
}
