import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Hub } from '@aws-amplify/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit() {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          this.zone.run(() => {
            this.router.navigate(['/']);
          });
          break;
        case 'signOut':
          this.zone.run(() => {
            this.router.navigate(['/auth/signin']);
          });
          break;
      }
    });
  }

}
