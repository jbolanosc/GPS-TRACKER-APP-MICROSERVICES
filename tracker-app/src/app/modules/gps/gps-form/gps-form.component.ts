import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GpsService } from './../../../services/gps-service/gps-service.service';
import { Gps } from './../../../models/Gps';
@Component({
  selector: 'app-gps-form',
  templateUrl: './gps-form.component.html',
  styleUrls: ['./gps-form.component.scss'],
})
export class GpsFormComponent implements OnInit {
  edit: boolean = false;
  gps: Gps = {
    id: 0,
    name: '',
    latitude: 0,
    longitude: 0,
    owner: 0,
    status: '',
  };

  constructor(private route: ActivatedRoute, private gpsService: GpsService) {}

  loadGps() {
    if (this.gps.id !== 0 && this.gps.id != undefined && !isNaN(this.gps.id)) {
      this.gpsService.getGps(this.gps.id).then((gps) => (this.gps = gps));
      this.edit = true;
    }
  }

  saveGps() {
    if (this.edit) {
      this.gpsService.updateGps(this.gps, this.gps.id);
      alert('Editando');
      return;
    }
    this.gpsService.createGps(this.gps);
    return;
  }

  ngOnInit(): void {
    this.gps.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadGps();
  }
}
