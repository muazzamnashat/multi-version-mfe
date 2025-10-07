import { Component, signal } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mfe-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class App {
  protected readonly title = signal('mfe');
}
