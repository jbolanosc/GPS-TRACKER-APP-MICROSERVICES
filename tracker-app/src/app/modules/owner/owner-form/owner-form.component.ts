import { Owner } from './../../../models/Owner';
import { OwnerService } from './../../../services/owner-service/owner.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.scss'],
})
export class OwnerFormComponent implements OnInit {
  private edit: boolean = false;
  private param: number = 0;
  owner: Owner = {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    address: null,
    country: null,
    phone: null,
    createdAt: null,
    updatedAt: null,
  };

  constructor(
    private route: ActivatedRoute,
    private ownerService: OwnerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.param = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadOwner();
  }

  private loadOwner() {
    if (this.param !== 0 && this.param != undefined && !isNaN(this.param)) {
      this.owner.id = this.param;
      this.ownerService.getOwner(this.owner.id).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.owner = res.data;
          this.showSuccess('Owner Loaded');
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error loading owner: ' + err.message);
        }
      );
      this.edit = true;
    }
  }

  saveOwner() {
    if (this.edit) {
      this.ownerService.updateOwner(this.owner, this.owner.id).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.showSuccess('Owner updated');
          this.router.navigate['owner'];
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error updating owner: ' + err.message);
        }
      );
    } else {
      this.ownerService.createOwner(this.owner).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.showSuccess('Owner created');
          this.router.navigate['owner'];
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error creating owner: ' + err.message);
        }
      );
    }

    this.router.navigate(['owner']);
  }

  private showSuccess(message: string) {
    this.toastr.success('Action Success', message);
  }

  private showError(message: string) {
    this.toastr.error('Action Failed', message);
  }
}
