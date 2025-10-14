import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeModule } from './mfe/mfe-module';
import { Mfe } from './mfe/mfe';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { Home } from './home/home';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { SharedServicesModule, AutoSharedService, UselessService } from '@shared/ng-ui';

// Register services before module instantiation
// SharedServiceRegistry.register(UselessService);

@NgModule({
  declarations: [App, Home],
  imports: [
    BrowserModule,
    CommonModule,
    MfeModule,
    SharedServicesModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    // Shared services are automatically provided by SharedServicesModule
  ],
  bootstrap: [App]
})
export class AppModule { }
