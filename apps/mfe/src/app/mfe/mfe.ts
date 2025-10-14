import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { UselessService, AutoSharedService } from '@shared/ng-ui';
import { format } from 'date-and-time';

@Component({
  selector: 'app-mfe',
  templateUrl: './mfe.html',
  styleUrl: './mfe.scss',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class Mfe {

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(@Inject(AutoSharedService.getSharedTokenByClass(UselessService)) public uselessService: UselessService) {
  }

  increment() {
    this.uselessService.increment();
  }

  formatDate(): string {
    return format(new Date(), 'ddd, MMM DD YYYY');
  }
}
