import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/app-common/overlay/overlay.service';
import { LoginRegisterComponent } from 'src/app/authentication/components/login-register-overlay/login-register-overlay.component';
import { loginRegisterOverlayBaseConfig } from 'src/app/authentication/login-register-base-config';
import { Mode } from 'src/app/authentication/model/login-register-config';
import { AuthService } from 'src/app/authentication/service/auth.service';
import { User } from 'src/app/authentication/state/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }

  register(): void {
    this.openDialog(Mode.REGISTER);
  }

  login(): void {
    this.openDialog(Mode.LOGIN);
  }

  private openDialog(mode: Mode) {
    this.overlayService.open(LoginRegisterComponent, {
      ...loginRegisterOverlayBaseConfig,
      hasBackdrop: true,
      closeOnBackdropClick: true,
      data: {
        mode,
      },
    });
  }
}
