import { OwnerService } from './../../../services/owner-service/owner.service';
import { Owner } from './../../../models/Owner';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-owner-table',
  templateUrl: './owner-table.component.html',
  styleUrls: ['./owner-table.component.scss'],
})
export class OwnerTableComponent implements OnInit {
  owners: Owner[] = [];

  first: number = 0;

  rows: number = 10;

  constructor(
    private ownerService: OwnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadOwners();
  }

  private loadOwners() {
    this.ownerService.getAllOwners().subscribe(
      (res) => {
        console.log('HTTP response', res);
        this.owners = res.data;
        this.showSuccess('Owners loaded');
      },
      (err) => {
        console.log('HTTP Error', err);
        this.showError('Error loading owners');
      }
    );
  }

  deleteOwner(id: number): void {
    this.ownerService.deleteOwner(id).subscribe(
      (res) => {
        console.log('HTTP response', res);
        this.showSuccess('Owner deleted');
      },
      (err) => {
        console.log('HTTP Error', err);
        this.showError('Error deleting owner');
      }
    );
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
    return this.owners ? this.first === this.owners.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.owners ? this.first === 0 : true;
  }
}
