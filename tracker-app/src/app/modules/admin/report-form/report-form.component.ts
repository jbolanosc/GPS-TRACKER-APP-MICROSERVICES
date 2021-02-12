import { ReportService } from './../../../services/report-service/report-service.service';
import { Report } from './../../../models/Report';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {
  edit: boolean = false;
  report: Report = {
    id: 0,
    type: '',
    description: '',
    gps: 0,
    owner: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {}

  loadReport() {
    console.log(this.report.id);
    if (
      this.report.id !== 0 &&
      this.report.id != undefined &&
      !isNaN(this.report.id)
    ) {
      this.reportService
        .getReport(this.report.id)
        .then((report) => (this.report = report));
      this.edit = true;
    }
  }

  saveReport() {
    console.log(this.report);
    console.log(this.edit);
    if (this.edit) {
      this.reportService.updateReport(this.report.id, this.report);
    } else {
      console.log(this.reportService.createReport(this.report));
    }
  }

  ngOnInit(): void {
    this.report.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadReport();
  }
}
