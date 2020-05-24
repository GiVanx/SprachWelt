import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFillGameComponent } from './text-fill-game.component';
import { MissingWordsComponent } from './missing-words/missing-words.component';
import { TextFillGameHeaderComponent } from './text-fill-game-header/text-fill-game-header.component';
import { TextWithGapsComponent } from './text-with-gaps/text-with-gaps.component';
import { Routes, RouterModule } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [
  {
    path: '',
    component: TextFillGameComponent,
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
  ],
  exports: [TextFillGameComponent],
})
export class TextFillGameModule {}
