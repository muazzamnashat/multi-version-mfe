import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Mfe2Component } from './mfe2.component';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../app.routes';



@NgModule({
  declarations: [Mfe2Component],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'home', component: Mfe2Component }
    ]),
  ]
})
export class Mfe2Module { }
