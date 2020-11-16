import { Injectable } from '@angular/core';
import { LoginProvider } from './login-provider.service';

declare var gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleLoginProviderService implements LoginProvider {
  static ID = 'GOOGLE_LOGIN_PROVIDER';
  private gapiSetup = false;
  private authInstance: gapi.auth2.GoogleAuth;

  async initGoogleAuth(): Promise<void> {
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    return pload.then(async () => {
      await gapi.auth2
        .init({
          client_id:
            '544207670281-10d4jci7e18aqaug9e7h18t80tp5r33d.apps.googleusercontent.com',
        })
        .then((auth) => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<string> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return await this.authInstance.signIn().then(
      (user) => {
        console.log('id_token', user.getAuthResponse().id_token);
        return user.getAuthResponse().id_token;
      },
      (error) => {
        console.log('ERROR', error);
        return '';
      }
    );
  }
}
