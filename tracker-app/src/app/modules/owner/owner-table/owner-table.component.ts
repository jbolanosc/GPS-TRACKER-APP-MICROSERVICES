import { OwnerService } from './../../../services/owner-service/owner.service';
import { Owner } from './../../../models/Owner';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-owner-table',
  templateUrl: './owner-table.component.html',
  styleUrls: ['./owner-table.component.scss'],
})
export class OwnerTableComponent implements OnInit {
  owners: Owner[] = [
    {
      id: 2,
      firstname: 'jOSUE',
      lastname: 'Bolaños',
      email: 'josue.carit@gmail.com',
      address: '133 fruo south',
      country: 'Costa RIca',
      phone: '1244',
    },
  ];

  first: number = 0;

  rows: number = 10;

  constructor(
    private ownerService: OwnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService
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
        this.showError('Error loading owners: ' + err.message);
      }
    );
  }

  deleteOwner(id: number): void {
    this.confirmationService.confirm({
      message: '¿Are you sure you want to delete this item?',
      accept: () => {
        this.ownerService.deleteOwner(id).subscribe(
          (res) => {
            console.log('HTTP response', res);
            this.showSuccess('Owner deleted');
          },
          (err) => {
            console.log('HTTP Error', err);
            this.showError('Error deleting owner: ' + err.message);
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
    return this.owners ? this.first === this.owners.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.owners ? this.first === 0 : true;
  }
}
