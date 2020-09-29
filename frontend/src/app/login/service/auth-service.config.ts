import { IdToLoginProvider } from '../model/id-to-provider.model';
import { LoginProvider } from './login-provider.service';

export class AuthServiceConfig {
  private loginProviders: Map<string, LoginProvider>;

  constructor(loginProviders: IdToLoginProvider[]) {
    this.loginProviders = new Map(
      loginProviders.map((lp) => [lp.id, lp.loginProvider])
    );
  }

  getProvider(loginProviderId) {
    return this.loginProviders.get(loginProviderId);
  }
}
