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
import { TextFillGameHeaderComponent } from './text-fill-game-header/text-fill-game-header.component';
import { MatButtonModule } from '@angular/material/button';
import { TextInputComponent } from './text-input/text-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextInputHeaderComponent } from './text-input-header/text-input-header.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TextWithGapsComponent,
    TextEditComponent,
    MissingWordsComponent,
    TextFillGameComponent,
    WordDisplayComponent,
    TextFillGameHeaderComponent,
    TextInputComponent,
    TextInputHeaderComponent,
  ],
  imports: [
    FormsModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
