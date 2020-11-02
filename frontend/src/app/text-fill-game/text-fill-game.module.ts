import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';
import { LayoutModule } from '../layout/layout.module';
import { TextFillGameHeaderComponent } from './text-fill-game-header/text-fill-game-header.component';
import { TextFillGameComponent } from './text-fill-game.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: TextFillGameComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [TextFillGameHeaderComponent, TextFillGameComponent],
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    CommonModule,
    MatDividerModule,
    RouterModule.forChild(routes),
    AppCommonModule,
    LayoutModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
  ],
  exports: [TextFillGameComponent],
})
export class TextFillGameModule {}
