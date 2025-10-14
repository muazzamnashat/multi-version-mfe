import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { UselessService, AutoSharedService } from '@shared/ng-ui';

@Component({
  selector: 'mfe2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  protected readonly title = 'mfe-2';
  protected readonly angularVersion = '19.2.0';

  constructor(@Inject(AutoSharedService.getSharedTokenByClass(UselessService)) public uselessService: UselessService) {
    console.log('AppComponent: uselessService: -> ', this.uselessService);
  }

  increment() {
    this.uselessService.increment();
  }

}
