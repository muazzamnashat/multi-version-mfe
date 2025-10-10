import { Component, Inject } from '@angular/core';
import { UselessService, USELESS_SERVICE_INSTANCE } from '@shared/ng-ui';
import { format } from 'date-and-time';

@Component({
  selector: 'app-mfe',
  templateUrl: './mfe.html',
  styleUrl: './mfe.scss',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class Mfe {

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(public uselessService: UselessService) {
  // constructor(@Inject(USELESS_SERVICE_INSTANCE) public uselessService: UselessService) {
  }

  increment() {
    this.uselessService.increment();
  }

  formatDate(): string {
    return format(new Date(), 'ddd, MMM DD YYYY');
  }
}
