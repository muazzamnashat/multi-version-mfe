import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeModule } from './mfe/mfe-module';
import { Mfe } from './mfe/mfe';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { Home } from './home/home';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [App, Home],
  imports: [
    BrowserModule,
    MfeModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [App]
})
export class AppModule { }
