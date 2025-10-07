import { Component } from '@angular/core';

declare const require: any;

@Component({
  selector: 'app-root',
  template: `
  <p>
  Angular Version in Shell: {{ngVersion}}
</p>
<p>&nbsp;</p>
<router-outlet></router-outlet>
  `,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class AppComponent {

  ngVersion = require('../../../../package.json').dependencies['@angular/core'];

  title = 'shell';
}
