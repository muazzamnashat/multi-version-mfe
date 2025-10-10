import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class Header {
  @Input() title = 'Header';
}
