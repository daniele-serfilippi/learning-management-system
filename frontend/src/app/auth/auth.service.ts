import { Injectable } from '@angular/core';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub, ICredentials } from '@aws-amplify/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { AmplifyService } from 'aws-amplify-angular';

export interface NewUser {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static SIGN_IN = 'signIn';
  static SIGN_OUT = 'signOut';
  static FACEBOOK = CognitoHostedUIIdentityProvider.Facebook;
  static GOOGLE = CognitoHostedUIIdentityProvider.Google;

  isLoggedInSubject = new BehaviorSubject<boolean>(this.loggedUser() ? true : false);
  user: CognitoUser;

  private _authState: Subject<CognitoUser | any> = new Subject<CognitoUser | any>();
  authState: Observable<CognitoUser | any> = this._authState.asObservable();

  constructor(private amplifyService: AmplifyService) {

    Hub.listen('auth', (data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this._authState.next(payload.event);
      }
    });

    this.amplifyService.authStateChange$
      .subscribe(authState => {
        switch (authState.state) {
          case 'signedIn':
            this.isLoggedInSubject.next(true);
            break;
          case 'signedOut':
            this.isLoggedInSubject.next(false);
            break;
        }
        if (!authState.user) {
          this.user = null;
        } else {
          this.user = authState.user;
        }
      });

  }

  signUp(user: NewUser): Promise<CognitoUser | any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
        given_name: user.firstName,
        family_name: user.lastName,
        phone_number: user.phone
      }
    });
  }

  signIn(username: string, password: string): Promise<CognitoUser | any> {
    return new Promise((resolve, reject) => {
      Auth.signIn(username, password)
        .then((user: CognitoUser | any) => {
          this.isLoggedInSubject.next(true);
          resolve(user);
        }).catch((error: any) => reject(error));
    });
  }

  async signOut(): Promise<any> {
    await Auth.signOut();
    this.isLoggedInSubject.next(false);
  }

  socialSignIn(provider: CognitoHostedUIIdentityProvider): Promise<ICredentials> {
    return Auth.federatedSignIn({
      provider
    });
  }

  isLoggedIn() : Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
   }

  async loggedUser() {
    try {
      const loggedUser = await Auth.currentAuthenticatedUser();
      return loggedUser;
    } catch {
      return null;
    }
  }

  forgotPassword(username: string) {
    return new Promise((resolve, reject) => {
      Auth.forgotPassword(username)
        .then((user) => resolve(user))
        .catch((error) => reject(error));
    });
  }

  resetPasswordWithCode(username: string, code: string, newPassword: string) {
    return new Promise((resolve, reject) => {
      Auth.forgotPasswordSubmit(username, code, newPassword)
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  }

}
