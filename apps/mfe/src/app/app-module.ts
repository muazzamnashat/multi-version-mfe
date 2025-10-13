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
import { SharedServicesModule, SharedServiceRegistry, UselessService } from '@shared/ng-ui';

// Register services before module instantiation
// SharedServiceRegistry.register(UselessService);

@NgModule({
  declarations: [App, Home],
  imports: [
    BrowserModule,
    CommonModule,
    MfeModule,
    MatButtonModule,
    SharedServicesModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    // Add shared service providers directly
    {
      provide: SharedServiceRegistry.getSharedToken(UselessService),
      useFactory: () => SharedServiceRegistry.getSharedInstance(UselessService)
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
