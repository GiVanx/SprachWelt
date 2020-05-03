import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextWithGapsComponent } from './text-with-gaps/text-with-gaps.component';
import { TextEditComponent } from './text-edit/text-edit.component';
import { MissingWordsComponent } from './missing-words/missing-words.component';
import { TextFillGameComponent } from './text-fill-game/text-fill-game.component';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { WordDisplayComponent } from './word-display/word-display.component';

@NgModule({
  declarations: [
    AppComponent,
    TextWithGapsComponent,
    TextEditComponent,
    MissingWordsComponent,
    TextFillGameComponent,
    WordDisplayComponent,
  ],
  imports: [
    FormsModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
