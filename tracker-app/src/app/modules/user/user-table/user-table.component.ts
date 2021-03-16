import { UserService } from './../../../services/user-service/user-service.service';
import { User } from './../../../models/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { interval, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit, OnDestroy {
  users: User[] = [];
  subscription: Subscription;
  first: number = 0;

  rows: number = 10;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadUsers() {
    this.subscription = interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.userService.getUsers())
      )
      .subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.users = res.data;
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error loading users: ' + err.message);
        }
      );
  }

  deleteUser(id: number): void {
    this.confirmationService.confirm({
      message: '¿Are you sure you want to delete this item?',
      accept: () => {
        this.userService.deleteUser(id).subscribe(
          (res) => {
            console.log('HTTP response', res);
            this.showSuccess('User deleted');
          },
          (err) => {
            console.log('HTTP Error', err);
            this.showError('Error deleting user: ' + err.message);
          }
        );
      },
    });
  }

  private showSuccess(message: string) {
    this.toastr.success('Action Success', message);
  }

  private showError(message: string) {
    this.toastr.error('Action failed', message);
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
    return this.users ? this.first === this.users.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }
}
