import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  private returnUrl = '/';
  loggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });

  }

  ngOnInit(): void {
    this.loggedIn = this.authService.loggedIn;
  }

  onSignIn() {
    this.router.navigate(['/auth/signin']);
  }

  onProfile() {
    this.router.navigate(['/auth/profile']);
  }

  onLogout() {
    this.authService.signOut();
  }

}
