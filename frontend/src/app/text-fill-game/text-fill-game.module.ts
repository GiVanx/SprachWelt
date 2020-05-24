import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFillGameComponent } from './text-fill-game.component';
import { MissingWordsComponent } from './missing-words/missing-words.component';
import { TextFillGameHeaderComponent } from './text-fill-game-header/text-fill-game-header.component';
import { TextWithGapsComponent } from './text-with-gaps/text-with-gaps.component';
import { Routes, RouterModule } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutModule } from '../layout/layout.module';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';

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
  declarations: [
    MissingWordsComponent,
    TextFillGameHeaderComponent,
    TextWithGapsComponent,
    TextFillGameComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    RouterModule.forChild(routes),
    AppCommonModule,
    LayoutModule,
  ],
  exports: [TextFillGameComponent],
})
export class TextFillGameModule {}
