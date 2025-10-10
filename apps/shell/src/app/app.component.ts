import { Component, Inject } from '@angular/core';
import { UselessService, USELESS_SERVICE_INSTANCE } from '@shared/ng-ui';

declare const require: any;

@Component({
  selector: 'app-root',
  styles: `
    .demo-section + .demo-section {
      margin-top: 16px;
    }
  `,
  template: `
    <lib-header title="Angular Version in Shell: {{ngVersion}}"></lib-header>
    <button mat-flat-button type="button" color="primary">
      Using material version 20.2.7
    </button>
    Count: {{uselessService.getCount}}
    <p>&nbsp;</p>
    <a href="/mfe/home" >GO TO MFE</a>
    <a href="/mfe2/home"  style="margin-left: 24px;">GO TO MFE2</a>
    <router-outlet></router-outlet>
  `,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class AppComponent {

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(public uselessService: UselessService) {
  // constructor(@Inject(USELESS_SERVICE_INSTANCE) public uselessService: UselessService) {
  }

  ngVersion = require('../../../../package.json').dependencies['@angular/core'];

  title = 'shell';
}
