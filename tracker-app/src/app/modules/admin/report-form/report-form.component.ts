import { OwnerService } from './../../../services/owner-service/owner.service';
import { GpsService } from './../../../services/gps-service/gps-service.service';
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
  statusItems = [
    { id: 1, label: 'UNSOLVED' },
    { id: 2, label: 'RESOLVED' },
  ];
  report: Report = {
    id: 0,
    type: null,
    description: null,
    gps: null,
    owner: null,
    status: null,
  };

  allGps = [
    {
      id: 1,
      name: 'C3PO',
    },
    {
      id: 2,
      name: 'R2D2',
    },
  ];
  owners = [
    {
      id: 1,
      firstname: 'JOSUE',
      lastname: 'Bolaños',
    },
    {
      id: 2,
      firstname: 'JOSUE',
      lastname: 'cartit',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private router: Router,
    private toastr: ToastrService,
    private gpsService: GpsService,
    private ownerService: OwnerService
  ) {}

  ngOnInit(): void {
    this.param = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadReport();
    this.loadGps();
    this.loadOwners();
    console.log(this.allGps);
  }

  private loadReport() {
    if (this.param !== 0 && this.param != undefined && !isNaN(this.param)) {
      this.report.id = this.param;
      this.reportService.getReport(this.report.id).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.edit = true;
          this.report = res.data;
          this.showSuccess('Report loaded');
        },
        (err) => {
          console.log('HTTP Error', err.message);
          this.showError('Error loading reports: ');
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
          this.showSuccess('Report created');
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error updating report');
        }
      );
    }
    this.router.navigate(['admin/reports']);
  }

  private showSuccess(message: string) {
    this.toastr.success(message, 'Action Success');
  }

  private showError(message: string) {
    this.toastr.error(message, 'Action failed');
  }

  private loadGps() {
    this.gpsService.getAllGps().subscribe(
      (res) => {
        console.log('HTTP response', res);
        this.allGps = res.data;
        this.showSuccess('Gps list loaded');
      },
      (err) => {
        console.log('HTTP Error', err.message);
        this.showError('Error loading gps');
      }
    );
  }

  private loadOwners() {
    this.ownerService.getAllOwners().subscribe(
      (res) => {
        console.log('HTTP response', res);
        this.owners = res.data;
        this.showSuccess('Owners list loaded');
      },
      (err) => {
        console.log('HTTP Error', err.message);
        this.showError('Error loading owners');
      }
    );
  }

  public saveGps(e): void {
    let id = e.target.value;
    console.log(id);
    let list = this.owners.filter((x) => x.id == id)[0];
    list ? (this.report.gps = parseInt(id)) : '';
    console.log(this.report);
  }

  public saveOwner(e): void {
    let id = e.target.value;
    console.log(id);
    let list = this.owners.filter((x) => x.id == id)[0];
    list ? (this.report.owner = parseInt(id)) : '';
    console.log(this.report);
  }
}
