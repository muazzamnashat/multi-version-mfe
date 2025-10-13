import { Component, Inject } from '@angular/core';
import { UselessService, SharedServiceRegistry } from '@shared/ng-ui';

@Component({
  selector: 'mfe2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  protected readonly title = 'mfe-2';
  protected readonly angularVersion = '19.2.0';

  constructor(@Inject(SharedServiceRegistry.getSharedToken(UselessService)) public uselessService: UselessService) {
  }

  increment() {
    this.uselessService.increment();
  }

}
