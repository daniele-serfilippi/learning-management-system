import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import Auth from '@aws-amplify/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { SidenavService } from './sidenav.service';

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

  public myWorkRoutes: SideNavRoute[];
  public customerRoutes: SideNavRoute[];

  constructor(
    private commandBarSidenavService: SidenavService
  ) { }

  public ngOnInit(): void {
    this.commandBarSidenavService.setSidenav(this.sidenav);
    this.loadNavListItems();
  }

  async loadNavListItems() {
    this.myWorkRoutes = [
      {
        "icon": "assignment",
        "route": "sales/activities",
        "title": "ACTIVITIES"
      },
      {
        "icon": "dashboard",
        "route": "sales/dashboards",
        "title": "DASHBOARDS"
      }
    ];

    this.customerRoutes = [
      {
        "icon": "contacts",
        "route": "sales/accounts",
        "title": "ACCOUNTS"
      },
      {
        "icon": "people",
        "route": "sales/contacts",
        "title": "CONTACTS"
      },
      {
        "icon": "settings_phone",
        "route": "leads",
        "title": "LEADS"
      },
      {
        "icon": "account_box",
        "route": "opportunities",
        "title": "OPPORTUNITIES"
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
