import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { WrapperComponent } from './wrapper.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import { NgUiModule, SharedServicesModule } from '@shared/ng-ui';
import { appRoutes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    MatBadgeModule,
    MatButtonModule,
    NgUiModule,
    SharedServicesModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    WrapperComponent
  ],
  providers: [
    // Shared services are automatically provided by SharedServicesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // (window as any).ngZone = this.ngZone;
  }
}
