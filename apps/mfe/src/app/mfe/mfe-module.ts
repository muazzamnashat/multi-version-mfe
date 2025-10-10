import { NgModule } from '@angular/core';
import { Mfe } from './mfe';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { NgUiModule, SharedServiceProvider, USELESS_SERVICE_INSTANCE } from '@shared/ng-ui';
@NgModule({
  declarations: [Mfe],
  imports: [
    MatButtonModule,
    MatBadgeModule,
    NgUiModule,
    RouterModule.forChild([
      { path: 'home', component: Mfe }
    ]),
  ],
  providers: [
    // SharedServiceProvider.getSharedUselessServiceProvider()
  ]
})
export class MfeModule { }
