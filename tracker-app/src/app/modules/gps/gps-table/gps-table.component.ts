import { Component, OnInit } from '@angular/core';
import { GpsService } from './../../../services/gps-service/gps-service.service';
import { Gps } from './../../../models/Gps';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-gps-table',
  templateUrl: './gps-table.component.html',
  styleUrls: ['./gps-table.component.scss'],
})
export class GpsTableComponent implements OnInit {
  gps: Gps[] = [
    {
      id: 123,
      name: 'gps1',
      latitude: 0,
      longitude: 0,
      owner: 2,
      status: 'active',
    },
    {
      id: 124,
      name: 'gps123',
      latitude: 0,
      longitude: 0,
      owner: 2,
      status: 'active',
    },
  ];

  first: number = 0;

  rows: number = 10;

  constructor(
    private gpsService: GpsService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadAllGps();
  }

  private loadAllGps() {
    this.gpsService.getAllGps().subscribe(
      (res) => {
        console.log('HTTP response', res);
        this.gps = res.data;
        this.showSuccess('Gps loaded');
      },
      (err) => {
        console.log('HTTP Error', err);
        this.showError('Error loading gps: ' + err.message);
      }
    );
  }

  deleteGps(id: number): void {
    this.confirmationService.confirm({
      message: '¿Are you sure you want to delete this item?',
      accept: () => {
        this.gpsService.deleteGps(id).subscribe(
          (res) => {
            console.log('HTTP response', res);
            this.showSuccess('Gps deleted');
          },
          (err) => {
            console.log('HTTP Error', err);
            this.showError('Error deleting gps: ' + err.message);
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
    return this.gps ? this.first === this.gps.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.gps ? this.first === 0 : true;
  }
}
