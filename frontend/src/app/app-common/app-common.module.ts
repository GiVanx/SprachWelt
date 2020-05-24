import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordDisplayComponent } from './word-display/word-display.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WordDisplayComponent],
  imports: [CommonModule, MatListModule, MatButtonModule, FormsModule],
  exports: [WordDisplayComponent],
})
export class AppCommonModule {}
