import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const require: any;

@Component({
  selector: 'app-root',
  template: `
  <h1>
    Micro Frontend
</h1>
<p>
    Angular Version:
</p>{{ ngVersion }}
<div>
    <a routerLink="mfe/a">Route A</a> |
    <a routerLink="mfe/b">Route B</a>
</div>

<router-outlet></router-outlet>

  `,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class AppComponent implements OnInit {

  ngVersion = require('../../../../package.json').dependencies['@angular/core'];

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl(location.pathname.substr(1));
    window.addEventListener('popstate', () => {
      this.router.navigateByUrl(location.pathname.substr(1));
    });
  }
}
