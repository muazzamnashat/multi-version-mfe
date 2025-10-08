import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { WrapperComponent } from './wrapper.component';
import { App } from './app';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Home } from './home/home';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import { startsWith, WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
@NgModule({
  imports: [
    BrowserModule,
    MatBadgeModule,
    MatButtonModule,
    RouterModule.forRoot([
      { path: '', component: Home, pathMatch: 'full' },
      {
        path: 'mfe',
        loadChildren: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4300/remoteEntry.js',
                exposedModule: './Module'
            })
            .then(m => m.MfeModule)
    },
    // {
    //     path: 'mfe2',
    //     loadChildren: () =>
    //         loadRemoteModule({
    //             type: 'module',
    //             remoteEntry: 'http://localhost:4400/remoteEntry.js',
    //             exposedModule: './Module'
    //         })
    //         .then(m => m.Mfe2Module)
    // },
    {
        matcher: startsWith('mfe2'),
        component: WebComponentWrapper,
        data: {
            type: 'module',
            remoteEntry: 'http://localhost:4400/remoteEntry.js',
            exposedModule: './web-components',
            elementName: 'mfe2-web-component'
        } as WebComponentWrapperOptions
    },
      // { matcher: startsWith('mfe'), component: WrapperComponent, data: { importName: 'mfe', elementName: 'mfe-element' } },

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
  constructor() {
    // (window as any).ngZone = this.ngZone;
  }
}
