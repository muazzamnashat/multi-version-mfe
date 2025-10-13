import { Injectable } from '@angular/core';
import { AutoSharedService } from '../base/auto-shared-service';

@Injectable()
export class UselessService extends AutoSharedService {
  count = 0;

  constructor() {
    super();
    console.log('UselessService constructor called');
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
