import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {
  isLoggedIn : Observable<boolean>;
  @Output() toggleSidenav = new EventEmitter<void>();

  private returnUrl = '/';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });

    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit(): void {

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
