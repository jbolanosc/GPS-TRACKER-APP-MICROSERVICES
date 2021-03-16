import { OwnerService } from './../../../services/owner-service/owner.service';
import { Owner } from './../../../models/Owner';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { interval, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-owner-table',
  templateUrl: './owner-table.component.html',
  styleUrls: ['./owner-table.component.scss'],
})
export class OwnerTableComponent implements OnInit, OnDestroy {
  owners: Owner[] = [];
  subscription: Subscription;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadOwners() {
    this.subscription = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.ownerService.getAllOwners())
      )
      .subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.owners = res.data;
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
    this.toastr.success('Action Success', message);
  }

  private showError(message: string) {
    this.toastr.error('Action Failed', message);
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
