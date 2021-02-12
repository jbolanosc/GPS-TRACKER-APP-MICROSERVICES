import { ReportService } from './../../../services/report-service/report-service.service';
import { Report } from './../../../models/Report';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {
  edit: boolean = false;
  param: number = 0;
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
    private router: Router
  ) {}

  loadReport() {
    if (this.param !== 0 && this.param != undefined && !isNaN(this.param)) {
      this.report.id = this.param;
      this.reportService
        .getReport(this.report.id)
        .then((report) => (this.report = report));
      this.edit = true;
    }
  }

  saveReport() {
    console.log(this.report);
    if (this.edit) {
      this.reportService
        .updateReport(this.report, this.report.id)
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.reportService.createReport(this.report).subscribe((data) => {
        console.log(data);
      });
    }
    this.router.navigate(['admin/reports']);
  }

  ngOnInit(): void {
    this.param = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadReport();
  }
}
