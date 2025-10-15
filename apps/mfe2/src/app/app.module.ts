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

import { SharedServicesModule, NgUiModule } from '@shared/ng-ui';
import { OverlayContainer } from '@angular/cdk/overlay';


@NgModule({
  declarations: [AppComponent, Home],
  imports: [
    Mfe2Module,
    SharedServicesModule,
    NgUiModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    // { provide: OverlayContainer, useClass: OverlayContainer }
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
