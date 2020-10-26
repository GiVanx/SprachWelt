import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from './layout/layout.module';
import { HttpErrorInterceptor } from './login/interceptor/htttp-error.interceptor';
import { JwtInterceptor } from './login/interceptor/jwt.interceptor';
import { LoginModule } from './login/login.module';
import { AuthService } from './login/service/auth.service';
import { TextEditComponent } from './text-edit/text-edit.component';
import { TextFillGameModule } from './text-fill-game/text-fill-game.module';
import { TextInputHeaderComponent } from './text-input-header/text-input-header.component';
import { TextInputComponent } from './text-input/text-input.component';
import { NewGameDialogComponent } from './new-game-dialog/new-game-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalErrorHandler } from './service/global-error.handler';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CancelGameDialogComponent } from './cancel-game-dialog/cancel-game-dialog.component';

export function appInitializer(authService: AuthService) {
  return () =>
    new Promise((resolve) => {
      authService.refreshToken().subscribe().add(resolve);
    });
}

@NgModule({
  declarations: [
    AppComponent,
    TextEditComponent,
    TextInputComponent,
    TextInputHeaderComponent,
    HomeComponent,
    NewGameDialogComponent,
    CancelGameDialogComponent,
  ],
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    TextFillGameModule,
    LayoutModule,
    LoginModule,
    FlexLayoutModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
