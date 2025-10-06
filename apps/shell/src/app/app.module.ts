import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { startsWith } from './router.utils';
import { WrapperComponent } from './wrapper.component';
import { App } from './app';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: App, pathMatch: 'full' },
      { matcher: startsWith('mfe'), component: WrapperComponent, data: { importName: 'mfe', elementName: 'mfe-element' } },

    ])
  ],
  declarations: [
    AppComponent,
    WrapperComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngZone: NgZone) {
    (window as any).ngZone = this.ngZone;
  }
}
