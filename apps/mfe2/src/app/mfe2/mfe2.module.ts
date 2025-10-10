import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Mfe2Component } from './mfe2.component';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [Mfe2Component],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild([
      { path: 'home', component: Mfe2Component }
    ]),
    MatBadgeModule,
    MatButtonModule,
  ]
})
export class Mfe2Module { }
