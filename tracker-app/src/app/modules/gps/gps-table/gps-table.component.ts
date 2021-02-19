import { Component, OnInit } from '@angular/core';
import { GpsService } from './../../../services/gps-service/gps-service.service';
import { Gps } from './../../../models/Gps';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-gps-table',
  templateUrl: './gps-table.component.html',
  styleUrls: ['./gps-table.component.scss'],
})
export class GpsTableComponent implements OnInit {
  gps: Gps[] = [];
  constructor(private gpsService: GpsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.gpsService.getAllGps().subscribe(
      (res) => {
        console.log('HTTP response', res);
        this.gps = res.data;
        this.showSuccess('Gps loaded');
      },
      (err) => {
        console.log('HTTP Error', err);
        this.showError('Error loading gps');
      }
    );
  }

  deleteGps(id: number): void {
    this.gpsService.deleteGps(id).subscribe(
      (res) => {
        console.log('HTTP response', res);
        this.showSuccess('Gps deleted');
      },
      (err) => {
        console.log('HTTP Error', err);
        this.showError('Error deleting gps');
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
