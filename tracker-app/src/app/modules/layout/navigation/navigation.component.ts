import { AuthService } from './../../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['auth/login']);
  }
}
