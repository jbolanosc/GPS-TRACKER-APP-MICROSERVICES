import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GpsService } from './../../../services/gps-service/gps-service.service';
import { Gps } from './../../../models/Gps';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gps-form',
  templateUrl: './gps-form.component.html',
  styleUrls: ['./gps-form.component.scss'],
})
export class GpsFormComponent implements OnInit {
  edit: boolean = false;
  param: number = 0;
  gps: Gps = {
    id: 0,
    name: '',
    latitude: 0,
    longitude: 0,
    owner: 0,
    status: '',
  };

  constructor(
    private route: ActivatedRoute,
    private gpsService: GpsService,
    private router: Router
  ) {}

  loadGps() {
    if (this.param !== 0 && this.param != undefined && !isNaN(this.param)) {
      this.gps.id = this.param;
      this.gpsService.getGps(this.gps.id).then((gps) => (this.gps = gps));
      this.edit = true;
    }
  }

  saveGps() {
    console.log(this.gps);
    if (this.edit) {
      this.gpsService.updateGps(this.gps, this.gps.id).subscribe((data) => {
        console.log(data);
      });
    } else {
      this.gpsService.createGps(this.gps).subscribe((data) => {
        console.log(data);
      });
    }

    this.router.navigate(['gps']);
  }

  ngOnInit(): void {
    this.param = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadGps();
  }
}
