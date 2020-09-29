import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextInputComponent } from './text-input/text-input.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './login/guard/auth-guard.service';
import { HomeComponent } from './home/home.component';

// TODO: add page not found route
const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'text',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: TextInputComponent,
      },
    ],
    canActivate: [AuthGuardService],
  },
  {
    path: 'text-fill',
    loadChildren: () =>
      import('./text-fill-game/text-fill-game.module').then(
        (m) => m.TextFillGameModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
