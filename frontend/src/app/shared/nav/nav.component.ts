import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import Auth from '@aws-amplify/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { NavService } from './nav.service';

interface SideNavRoute {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit, OnDestroy {

  @ViewChild('commandbarSidenav', { static: true })
  public sidenav: MatSidenav;

  public courseRoutes: SideNavRoute[];

  constructor(
    private commandBarNavService: NavService
  ) { }

  public ngOnInit(): void {
    this.commandBarNavService.setSidenav(this.sidenav);
    this.loadNavListItems();
  }

  async loadNavListItems() {
    this.courseRoutes = [
      {
        icon: 'dashboard',
        route: 'courses',
        title: 'All'
      },
      {
        icon: 'add',
        route: 'course/create',
        title: 'New course'
      }
    ];
  }

  public async isAuthenticated() {
    return true;
    // return await Auth.currentAuthenticatedUser();
  }

  public ngOnDestroy() {

  }

}
