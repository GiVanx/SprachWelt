import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextWithGapsComponent } from './text-fill-game/text-with-gaps/text-with-gaps.component';
import { TextEditComponent } from './text-edit/text-edit.component';
import { MissingWordsComponent } from './text-fill-game/missing-words/missing-words.component';
import { TextFillGameComponent } from './text-fill-game/text-fill-game.component';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { WordDisplayComponent } from './app-common/word-display/word-display.component';
import { TextFillGameHeaderComponent } from './text-fill-game/text-fill-game-header/text-fill-game-header.component';
import { MatButtonModule } from '@angular/material/button';
import { TextInputComponent } from './text-input/text-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextInputHeaderComponent } from './text-input-header/text-input-header.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { TextFillGameModule } from './text-fill-game/text-fill-game.module';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './login/login.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TextEditComponent,
    TextInputComponent,
    TextInputHeaderComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    TextFillGameModule,
    LayoutModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
