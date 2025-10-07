import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mfe } from './mfe';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from '../app.routes';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [Mfe],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: 'home', component: Mfe }
    ]),
  ]
})
export class MfeModule { }
