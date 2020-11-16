import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayService } from 'src/app/app-common/overlay/overlay.service';
import { loginRegisterOverlayBaseConfig } from '../../login-register-base-config';
import {
  LoginRegisterOverlayConfig,
  Mode,
} from '../../model/login-register-config';
import { LoginRegisterComponent } from '../login-register-overlay/login-register-overlay.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  navigationUrl: string;

  constructor(
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private router: Router
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
      mode: Mode.REGISTER,
      afterSuccessAction: () => this.router.navigateByUrl(this.navigationUrl),
      showNoAccountYet: false,
      showAlreadyHaveAnAccount: true,
    };
  }
}
