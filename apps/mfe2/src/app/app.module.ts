import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mfe2Module } from './mfe2/mfe2.module';
import { Mfe2Component } from './mfe2/mfe2.component';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Home } from './home/home';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';



@NgModule({
  declarations: [AppComponent, Home],
  imports: [
    BrowserModule,
    Mfe2Module,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
