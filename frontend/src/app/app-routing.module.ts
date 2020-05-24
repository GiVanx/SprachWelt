import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextInputComponent } from './text-input/text-input.component';
import { TextFillGameComponent } from './text-fill-game/text-fill-game.component';

// TODO: add page not found route
const routes: Routes = [
  {
    path: '',
    redirectTo: '/text',
    pathMatch: 'full',
  },
  {
    path: 'text',
    component: TextInputComponent,
  },
  {
    path: 'text-fill',
    loadChildren: () =>
      import('./text-fill-game/text-fill-game.module').then(
        (m) => m.TextFillGameModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
