import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveGameResolverService } from './active-game-resolver.service';
import { AuthGuardService } from './authentication/guard/auth-guard.service';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { TextInputComponent } from './text-input/text-input.component';

// TODO: add page not found route
const routes: Routes = [
  {
    path: 'home',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'contact',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: ContactComponent,
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'text',
    component: AppLayoutComponent,
    resolve: {
      activeGame: ActiveGameResolverService,
    },
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
    resolve: {
      activeGame: ActiveGameResolverService,
    },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
