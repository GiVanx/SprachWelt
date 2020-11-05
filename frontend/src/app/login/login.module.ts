import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login.component';
import { AuthServiceConfig } from './service/auth-service.config';
import { AuthService } from './service/auth.service';
import { GoogleLoginProviderService } from './service/google-login.provider';

const authConfig = () =>
  new AuthServiceConfig([
    {
      id: GoogleLoginProviderService.ID,
      loginProvider: new GoogleLoginProviderService(),
    },
  ]);

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: authConfig,
    },
  ],
  imports: [HttpClientModule, MatButtonModule, FlexLayoutModule],
})
export class LoginModule {}
