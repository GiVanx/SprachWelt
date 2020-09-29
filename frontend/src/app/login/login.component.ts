import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
import { GoogleLoginProviderService } from './service/google-login.provider';
import { User } from './state/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  user$: Observable<User>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$();
    this.user$
      .pipe(
        filter((u) => u !== null && u !== undefined),
        first()
      )
      .subscribe((user) => this.router.navigate([''])); // TODO: may be change the route?
  }

  authenticate(authType: string) {
    this.authService
      .authenticate(this.getProviderId(authType))
      .pipe(first())
      .subscribe();
  }

  getProviderId(authType: string) {
    if (authType === 'google') {
      return GoogleLoginProviderService.ID;
    }
    throw new Error("Could not find provider for authType '" + authType + "'");
  }
}
