import { Component, OnInit } from '@angular/core';
import { GpsService } from './../../../services/gps-service/gps-service.service';
import { Gps } from './../../../models/Gps';
@Component({
  selector: 'app-gps-table',
  templateUrl: './gps-table.component.html',
  styleUrls: ['./gps-table.component.scss'],
})
export class GpsTableComponent implements OnInit {
  gps: Gps[] = [];
  constructor(private gpsService: GpsService) {}

  ngOnInit(): void {
    this.gpsService.getAllGps().then((gps) => (this.gps = gps));
  }
}
