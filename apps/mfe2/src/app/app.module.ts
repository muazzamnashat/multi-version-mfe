import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mfe2Module } from './mfe2/mfe2.module';
import { Mfe2Component } from './mfe2/mfe2.component';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Home } from './home/home';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { createCustomElement } from '@angular/elements';

import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import { SharedServicesModule, SharedServiceRegistry, UselessService } from '@shared/ng-ui';

// Register services before module instantiation
// SharedServiceRegistry.register(UselessService);

@NgModule({
  declarations: [AppComponent, Home],
  imports: [
    Mfe2Module,
    SharedServicesModule,
    RouterModule.forRoot(routes),
    MatBadgeModule,
    MatButtonModule
  ],
  providers: [
    // Add shared service providers directly
    {
      provide: SharedServiceRegistry.getSharedToken(UselessService),
      useFactory: () => SharedServiceRegistry.getSharedInstance(UselessService)
    }
  ],
  bootstrap: []
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  ngDoBootstrap(): void {
    const ce = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('mfe2-web-component', ce);
  }
}
