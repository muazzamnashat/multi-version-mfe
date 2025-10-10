import { Component, Inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { USELESS_SERVICE_INSTANCE, UselessService } from '@shared/ng-ui';

@Component({
  selector: 'mfe2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  protected readonly title = 'mfe-2';
  protected readonly angularVersion = '19.2.0';

  constructor(public uselessService: UselessService) {
  // constructor(@Inject(USELESS_SERVICE_INSTANCE) public uselessService: UselessService) {
  }

  increment() {
    this.uselessService.increment();
  }
}
