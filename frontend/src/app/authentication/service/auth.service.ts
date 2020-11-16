import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtToken } from '../model/jwt-token';
import { Tokens } from '../model/tokens';
import { User } from '../state/model/user';
import { AuthServiceConfig } from './auth-service.config';
import { GoogleLoginProviderService } from './google-login.provider';
import { LoginProvider } from './login-provider.service';

abstract class Action {
  ID_TOKEN_HEADER_KEY = 'idToken';
  SERVER_URL = environment.serverUrl;

  constructor(private httpClient: HttpClient) {}

  abstract getEndpoint(loginProviderId): string;

  execute(idToken, loginProviderId): Observable<Tokens> {
    const loginEndpoint = this.getEndpoint(loginProviderId);
    return this.sendRequest(idToken, loginEndpoint);
  }

  private sendRequest(idToken, endpoint) {
    let headers = new HttpHeaders();
    headers = headers.set(this.ID_TOKEN_HEADER_KEY, idToken);

    return this.httpClient.post<Tokens>(endpoint, null, {
      headers,
    });
  }
}

class LoginAction extends Action {
  getEndpoint(loginProviderId): string {
    if (loginProviderId === GoogleLoginProviderService.ID) {
      return `${this.SERVER_URL}/login/google`;
    }
  }
}

class RegisterAction extends Action {
  getEndpoint(loginProviderId): string {
    if (loginProviderId === GoogleLoginProviderService.ID) {
      return `${this.SERVER_URL}/register/google`;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userState: BehaviorSubject<User> = new BehaviorSubject(null);

  JWT_TOKEN = 'jwtToken';
  SERVER_URL = environment.serverUrl;
  private jwtService: JwtHelperService;

  constructor(
    private authConfig: AuthServiceConfig,
    private httpClient: HttpClient
  ) {
    this.jwtService = new JwtHelperService();
  }

  user$() {
    return this.userState.asObservable();
  }

  login(loginProviderId) {
    return this.process(new LoginAction(this.httpClient), loginProviderId);
  }

  register(loginProviderId) {
    return this.process(new RegisterAction(this.httpClient), loginProviderId);
  }

  process(action: LoginAction | RegisterAction, loginProviderId) {
    const loginProvider: LoginProvider = this.authConfig.getProvider(
      loginProviderId
    );

    return from(loginProvider.authenticate()).pipe(
      switchMap((idToken) => action.execute(idToken, loginProviderId)),
      tap((tokens) => this.saveToken(tokens)),
      map((_) => this.loadUser()),
      tap(() => this.startRefreshTokenTimer())
    );
  }

  logout() {
    localStorage.clear();
    this.clearRefreshTokenTimer();
    this.userState.next(null);
  }

  refreshToken() {
    return this.httpClient
      .post<Tokens>(`${this.SERVER_URL}/refresh-token`, {})
      .pipe(
        tap((tokens) => this.saveToken(tokens)),
        tap((_) => this.startRefreshTokenTimer()),
        map((_) => this.loadUser())
      );
  }

  loadUser(): User {
    const jwt = this.getToken();
    if (jwt && !this.jwtService.isTokenExpired(jwt)) {
      const jwtToken: JwtToken = this.jwtService.decodeToken(jwt);
      const user = new User();
      user.email = jwtToken.email;
      user.name = jwtToken.sub;
      this.userState.next(user);
      return user;
    }
    return null;
  }

  saveToken(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwtToken);
  }

  getToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getDecodedToken(): JwtToken {
    return this.jwtService.decodeToken(this.getToken());
  }

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    const token = this.getDecodedToken();

    const expires = new Date(token.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private clearRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
