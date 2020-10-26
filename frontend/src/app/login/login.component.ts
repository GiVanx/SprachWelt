import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
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
  navigationUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.navigationUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  authenticate(authType: string) {
    this.authService
      .authenticate(this.getProviderId(authType))
      .pipe(first())
      .subscribe((data) => {
        this.router.navigateByUrl(this.navigationUrl);
      });
  }

  getProviderId(authType: string) {
    if (authType === 'google') {
      return GoogleLoginProviderService.ID;
    }
    throw new Error("Could not find provider for authType '" + authType + "'");
  }
}
