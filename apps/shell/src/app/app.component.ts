import { Component } from '@angular/core';

declare const require: any;

@Component({
  selector: 'app-root',
  styles: `
    .demo-section + .demo-section {
      margin-top: 16px;
    }
  `,
  template: `
  <p>
  Angular Version in Shell: {{ngVersion}}
  </p>
  <button mat-flat-button type="button" color="primary">
    Mat Button Using material version 20.2.7
  </button>
  <p>&nbsp;</p>
  <a href="/mfe/home" >GO TO MFE</a>
  <a href="/mfe2/home"  style="margin-left: 24px;">GO TO MFE2</a>
  <router-outlet></router-outlet>
  `,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class AppComponent {

  ngVersion = require('../../../../package.json').dependencies['@angular/core'];

  title = 'shell';
}
