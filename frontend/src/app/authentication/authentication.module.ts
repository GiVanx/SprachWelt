import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { routes } from './authentication.routing';
import { LoginRegisterErrorDialogComponent } from './components/login-register-error-dialog/login-register-error-dialog.component';
import { LoginRegisterComponent } from './components/login-register-overlay/login-register-overlay.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthServiceConfig } from './service/auth-service.config';
import { GoogleLoginProviderService } from './service/google-login.provider';

const authConfig = () =>
  new AuthServiceConfig([
    {
      id: GoogleLoginProviderService.ID,
      loginProvider: new GoogleLoginProviderService(),
    },
  ]);

@NgModule({
  declarations: [
    LoginRegisterComponent,
    LoginComponent,
    RegisterComponent,
    LoginRegisterErrorDialogComponent,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: authConfig,
    },
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatToolbarModule,
    MatDialogModule,
  ],
})
export class AuthenticationModule {}
