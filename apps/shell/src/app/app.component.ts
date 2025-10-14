import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UselessService, AutoSharedService } from '@shared/ng-ui';

declare const require: any;

@Component({
  selector: 'app-root',
  styles: `
    .demo-section + .demo-section {
      margin-top: 16px;
    }
  `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class AppComponent {

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(@Inject(AutoSharedService.getSharedTokenByClass(UselessService)) public uselessService: UselessService, private router: Router) {
    console.log('AppComponent: uselessService: -> ', this.uselessService);
  }

  ngVersion = require('../../../../package.json').dependencies['@angular/core'];

  title = 'shell';

  navigateToMfe(path: string) {
    this.router.navigate([path]);
  }

}
