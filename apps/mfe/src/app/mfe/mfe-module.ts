import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mfe } from './mfe';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from '../app.routes';



@NgModule({
  declarations: [Mfe],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'home', component: Mfe }
    ]),
  ]
})
export class MfeModule { }
