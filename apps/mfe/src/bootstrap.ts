import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AppModule } from './app/app-module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MfeModule } from './app/mfe/mfe-module';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

platformBrowser().bootstrapModule(AppModule)
  .catch((err: any) => console.error(err));
