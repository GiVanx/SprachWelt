import { Routes } from '@angular/router';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './guard/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];
