import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CoreModule } from './lgs-core/lgs-core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [NgxSpinnerModule, CoreModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
