import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  LgsDashboardComponent,
  LgsShellComponent
} from './lgs-screens';
import { ShellModule } from './lgs-screens/lgs-shell/lgs-shell.module';

@NgModule({
  declarations: [
    AppComponent,
    LgsDashboardComponent,
    LgsShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShellModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
