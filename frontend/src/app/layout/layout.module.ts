import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, AppLayoutComponent, AppFooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  exports: [AppLayoutComponent],
})
export class LayoutModule {}
