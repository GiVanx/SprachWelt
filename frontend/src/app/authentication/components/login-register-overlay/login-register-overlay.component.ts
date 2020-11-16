import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { OverlayControl } from 'src/app/app-common/overlay/overlay-control';
import { OVERLAY_DATA } from 'src/app/app-common/overlay/overlay-tokens';
import {
  LoginRegisterOverlayConfig,
  Mode,
} from '../../model/login-register-config';
import { AuthService } from '../../service/auth.service';
import { GoogleLoginProviderService } from '../../service/google-login.provider';
import { User } from '../../state/model/user';
import { LoginRegisterErrorDialogComponent } from '../login-register-error-dialog/login-register-error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login-register-overlay.component.html',
  styleUrls: ['./login-register-overlay.component.less'],
})
export class LoginRegisterComponent implements OnInit {
  user$: Observable<User>;
  navigationUrl: string;
  headerLabel;

  getHeaderLabel(mode: Mode) {
    if (mode === Mode.LOGIN) {
      return 'Sign in';
    } else if (mode === Mode.REGISTER) {
      return 'Register';
    }
  }

  constructor(
    private overlayControl: OverlayControl,
    @Inject(OVERLAY_DATA) public config: LoginRegisterOverlayConfig,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private errorDialog: MatDialog
  ) {
    this.headerLabel = this.getHeaderLabel(config.mode);
  }

  ngOnInit(): void {
    this.navigationUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  authenticate(authType: string) {
    this.getAction(authType)
      .pipe(first())
      .subscribe(
        (data) => {
          if (this.config.afterSuccessAction) {
            this.config.afterSuccessAction();
          }
          this.overlayControl.close();
        },
        (error) => {
          this.errorDialog.open(LoginRegisterErrorDialogComponent, {
            data: { mode: this.config.mode, error: error.error.message },
          });
        }
      );
  }

  onNoAccountYetClick() {
    this.overlayControl.close();
    this.router.navigate(['auth', 'register'], {
      queryParams: { returnUrl: this.navigationUrl },
    });
  }

  onAlreadyHaveAnAccount() {
    this.overlayControl.close();
    this.router.navigate(['auth', 'login'], {
      queryParams: { returnUrl: this.navigationUrl },
    });
  }

  getAction(authType: string) {
    if (this.config.mode === Mode.LOGIN) {
      return this.authService.login(this.getProviderId(authType));
    } else if (this.config.mode === Mode.REGISTER) {
      return this.authService.register(this.getProviderId(authType));
    }
  }

  getProviderId(authType: string) {
    if (authType === 'google') {
      return GoogleLoginProviderService.ID;
    }
    throw new Error("Could not find provider for authType '" + authType + "'");
  }
}
