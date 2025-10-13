import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UselessService, SharedServiceRegistry } from '@shared/ng-ui';

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
    <button (click)="navigateToMfe('/mfe/home')" >GO TO MFE</button>
    <button (click)="navigateToMfe('/mfe2/home')"  style="margin-left: 24px;">GO TO MFE2</button>
    <router-outlet></router-outlet>
  `,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class AppComponent {

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(@Inject(SharedServiceRegistry.getSharedToken(UselessService)) public uselessService: UselessService, private router: Router) {
  }

  ngVersion = require('../../../../package.json').dependencies['@angular/core'];

  title = 'shell';

  navigateToMfe(path: string) {
    this.router.navigate([path]);
  }

}
