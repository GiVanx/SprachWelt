import { LoginProvider } from '../service/login-provider.service';

export interface IdToLoginProvider {
  id: string;
  loginProvider: LoginProvider;
}
