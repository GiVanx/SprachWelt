import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverlayService } from 'src/app/app-common/overlay/overlay.service';
import { loginRegisterOverlayBaseConfig } from '../../login-register-base-config';
import {
  LoginRegisterOverlayConfig,
  Mode,
} from '../../model/login-register-config';
import { LoginRegisterComponent } from '../login-register-overlay/login-register-overlay.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  navigationUrl: string;

  constructor(
    private overlayService: OverlayService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.navigationUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.overlayService.open(LoginRegisterComponent, {
      ...loginRegisterOverlayBaseConfig,
      closeOnBackdropClick: false,
      data: this.getConfig(),
    });
  }

  getConfig(): LoginRegisterOverlayConfig {
    return {
      mode: Mode.LOGIN,
      afterSuccessAction: () => {},
      showNoAccountYet: true,
      showAlreadyHaveAnAccount: false,
    };
  }
}
