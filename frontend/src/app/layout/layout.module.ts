import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

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
