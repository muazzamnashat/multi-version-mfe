/**
 * USAGE EXAMPLES FOR SHARED SERVICES
 * 
 * This file shows how easy it is to create and use shared services
 * across microfrontends with the new simplified approach.
 */

import { Injectable } from '@angular/core';
import { AutoSharedService } from '../base/auto-shared-service';

// ========================================
// EXAMPLE 1: Creating a New Shared Service
// ========================================

@Injectable({
  providedIn: 'root'
})
export class UserService extends AutoSharedService {
  private currentUser: any = null;
  
  constructor() {
    super(); // This automatically makes the service shared!
  }
  
  setUser(user: any) {
    this.currentUser = user;
  }
  
  getUser() {
    return this.currentUser;
  }
  
  isLoggedIn() {
    return this.currentUser !== null;
  }
}

// ========================================
// EXAMPLE 2: Another Shared Service
// ========================================

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends AutoSharedService {
  private notifications: string[] = [];
  
  constructor() {
    super(); // Automatically shared!
  }
  
  addNotification(message: string) {
    this.notifications.push(message);
  }
  
  getNotifications() {
    return [...this.notifications];
  }
  
  clearNotifications() {
    this.notifications = [];
  }
}

// ========================================
// EXAMPLE 3: Using Shared Services in Components
// ========================================

/*
// In any component across any microfrontend:

import { Component, inject } from '@angular/core';
import { UselessService, UserService, NotificationService } from '@shared/ng-ui';

@Component({
  selector: 'app-example',
  template: `
    <div>
      <p>Count: {{ uselessService.getCount }}</p>
      <button (click)="increment()">Increment</button>
      
      <p>User: {{ userService.getUser()?.name || 'Not logged in' }}</p>
      <button (click)="login()">Login</button>
      
      <div *ngFor="let notification of notifications">
        {{ notification }}
      </div>
    </div>
  `
})
export class ExampleComponent {
  // Just inject normally - the shared instance will be used automatically!
  private uselessService = inject(UselessService);
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
  
  get notifications() {
    return this.notificationService.getNotifications();
  }
  
  increment() {
    this.uselessService.increment();
  }
  
  login() {
    this.userService.setUser({ name: 'John Doe' });
    this.notificationService.addNotification('User logged in!');
  }
}
*/

// ========================================
// EXAMPLE 4: Registering New Services
// ========================================

/*
// In shared/src/lib/shared-services.module.ts, just add:

import { UserService } from './examples/usage-examples';

// Register services before module instantiation
AutoSharedService.register(UselessService);
AutoSharedService.register(UserService);        // Add this
AutoSharedService.register(NotificationService); // Add this

export class SharedServicesModule {
  // Services are automatically provided via getAllProviders()
}
*/

// ========================================
// EXAMPLE 5: Advanced Usage Patterns
// ========================================

/*
// You can also create services with more complex logic:

@Injectable()
export class AdvancedService extends AutoSharedService {
  private data: Map<string, any> = new Map();
  
  constructor() {
    super();
    this.initializeData();
  }
  
  private initializeData() {
    // Complex initialization logic
    this.data.set('config', { theme: 'dark', language: 'en' });
  }
  
  setConfig(key: string, value: any) {
    this.data.set(key, value);
  }
  
  getConfig(key: string) {
    return this.data.get(key);
  }
}

// Usage in component:
// const service = inject(AdvancedService);
*/
