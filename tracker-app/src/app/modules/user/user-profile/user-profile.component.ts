import { UserService } from './../../../services/user-service/user-service.service';
import { User } from './../../../models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  private edit: boolean = false;
  private param: number = 0;
  roleOptions = [
    { id: 1, label: 'Admin' },
    { id: 2, label: 'User' },
  ];
  user: User = {
    id: null,
    email: null,
    password: null,
    role: null,
    createdAt: null,
    updatedAt: null,
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.param = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }

  private loadUser() {
    if (this.param !== 0 && this.param != undefined && !isNaN(this.param)) {
      this.user.id = this.param;
      this.userService.getUser(this.user.id).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.user = res.data;
          this.user.password = '';
          this.showSuccess('User Loaded');
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error loading user: ' + err.message);
        }
      );
      this.edit = true;
    }
  }

  saveUser() {
    if (this.edit) {
      this.userService.updateUser(this.user.id, this.user).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.showSuccess('User updated');
          this.router.navigate['user'];
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error updating user: ' + err.message);
        }
      );
    } else {
      this.userService.createUser(this.user).subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.showSuccess('User created');
          this.router.navigate['user'];
        },
        (err) => {
          console.log('HTTP Error', err);
          this.showError('Error creating user: ' + err.message);
        }
      );
    }

    this.router.navigate(['user']);
  }

  private showSuccess(message: string) {
    this.toastr.success('Action Success', message);
  }

  private showError(message: string) {
    this.toastr.error('Action failed', message);
  }
}
