import { NgModule } from '@angular/core';
import { Mfe } from './mfe';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { NgUiModule, SharedServicesModule } from '@shared/ng-ui';
@NgModule({
  declarations: [Mfe],
  imports: [
    MatButtonModule,
    MatBadgeModule,
    NgUiModule,
    SharedServicesModule,
    RouterModule.forChild([
      { path: 'home', component: Mfe }
    ]),
  ],
  exports: [Mfe, MatButtonModule],
  providers: []
})
export class MfeModule { }
