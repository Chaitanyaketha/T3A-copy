import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { LoginGuardGuard } from '../../core/gurads/login-guard.guard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userRole: string | null = null;
  constructor(private loginservice: LoginService) {}
  ngOnInit(): void {
    this.userRole = this.loginservice.getUserRole();
    // console.log('User role:', this.userRole);
  }
}
