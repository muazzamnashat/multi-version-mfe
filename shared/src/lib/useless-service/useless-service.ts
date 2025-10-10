import { Injectable, InjectionToken } from '@angular/core';

// Create a global instance token
export const USELESS_SERVICE_INSTANCE = new InjectionToken<UselessService>('UselessServiceInstance');

@Injectable({
  providedIn: 'root'
})
export class UselessService {
  count = 0;

  constructor() {
    console.log('UselessService constructor');
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  get getCount() {
    return this.count;
  }
}
