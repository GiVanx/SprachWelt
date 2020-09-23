import { Injectable } from '@angular/core';
import { AuthServiceConfig } from './auth-service.config';
import { LoginProvider } from './login-provider.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authConfig: AuthServiceConfig) {}

  authenticate(loginProviderId) {
    const loginProvider: LoginProvider = this.authConfig.getProvider(
      loginProviderId
    );
    return loginProvider.authenticate();
  }
}
