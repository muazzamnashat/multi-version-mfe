import { Component } from '@angular/core';
import { format } from 'date-and-time';

@Component({
  selector: 'app-mfe',
  templateUrl: './mfe.html',
  styleUrl: './mfe.scss',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class Mfe {

  formatDate(): string {
    return format(new Date(), 'ddd, MMM DD YYYY');
  }
}
