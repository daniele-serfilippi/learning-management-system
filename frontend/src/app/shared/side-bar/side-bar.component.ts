import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent {

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

  }

  public onProfile() {
    this.router.navigate(['users/profile']);
  }

  public logout() {
    this.authService.signOut();
  }

}
