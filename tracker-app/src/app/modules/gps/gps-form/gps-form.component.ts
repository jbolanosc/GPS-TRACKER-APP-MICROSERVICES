import { OwnerService } from './../../../services/owner-service/owner.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GpsService } from './../../../services/gps-service/gps-service.service';
import { Gps } from './../../../models/Gps';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gps-form',
  templateUrl: './gps-form.component.html',
  styleUrls: ['./gps-form.component.scss'],
})
export class GpsFormComponent implements OnInit {
  private edit: boolean = false;
  private param: number = 0;
  statusOptions = [
    { id: 1, label: 'Active' },
    { id: 2, label: 'Inactive' },
  ];
  gps: Gps = {
    id: 0,
    name: null,
    latitude: 0,
    longitude: 0,
    owner: 0,
    status: null,
  };
  owners = [
    {
      id: 1,
      firstname: 'Josue',
      lastname: 'Bolaños',
    },
    {
      id: 2,
      firstname: 'David',
      lastname: 'Bolaños',
    },
  ];
  selectedOwner: string;

  constructor(
    private route: ActivatedRoute,
    private gpsService: GpsService,
    private router: Router,
    private toastr: ToastrService,
    private onwerService: OwnerService
  ) {}

  ngOnInit(): void {
    this.param = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadGps();
    this.loadOwners();
  }

  private loadGps() {
    if (this.param !== 0 && this.param != undefined && !isNaN(this.param)) {
      this.gps.id = this.param;
      this.gpsService.getGps(this.gps.id).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.gps = res.data;
          this.showSuccess('Gps Loaded');
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error loading gps');
        }
      );
      this.edit = true;
    }
  }

  private loadOwners() {
    this.onwerService.getAllOwners().subscribe(
      (res) => {
        console.log('HTTP response', res);
        this.owners = res.data;
        this.showSuccess('owners list Loaded');
      },
      (err) => {
        console.log('HTTP Error', err);
        this.showError('Error loading owners list ' + err);
      }
    );
  }

  saveGps() {
    if (this.edit) {
      this.gpsService.updateGps(this.gps, this.gps.id).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.showSuccess('Gps updated');
          this.router.navigate['gps'];
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error updating gps');
        }
      );
    } else {
      this.gpsService.createGps(this.gps).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.showSuccess('Gps created');
          this.router.navigate['gps'];
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error creating gps');
        }
      );
    }

    this.router.navigate(['gps']);
  }

  private showSuccess(message: string) {
    this.toastr.success(message, 'Action Success');
  }

  private showError(message: string) {
    this.toastr.error(message, 'Action failed');
  }

  public saveOwner(e): void {
    let id = e.target.value;
    console.log(id);
    let list = this.owners.filter((x) => x.id == id)[0];
    list ? (this.gps.owner = parseInt(id)) : '';
    console.log(this.gps);
  }
}
