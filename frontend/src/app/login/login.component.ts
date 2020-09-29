import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { GoogleLoginProviderService } from './service/google-login.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  authenticate(authType: string) {
    this.authService.authenticate(this.getProviderId(authType));
  }

  getProviderId(authType: string) {
    if (authType === 'google') {
      return GoogleLoginProviderService.ID;
    }
    throw new Error("Could not find provider for authType '" + authType + "'");
  }
}
