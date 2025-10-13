# Shared Services Across Microfrontends

This guide explains how to create and use shared services across multiple Angular microfrontends using Module Federation.

## Table of Contents

1. [Overview](#overview)
2. [How It Works](#how-it-works)
3. [Architecture](#architecture)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Examples](#examples)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Overview

The shared service system allows you to share a single instance of a service across multiple Angular microfrontends. This ensures that state and data are consistent across all applications in your microfrontend architecture.

### Key Benefits

- **Single Source of Truth**: One service instance shared across all microfrontends
- **State Synchronization**: Changes in one microfrontend are immediately reflected in others
- **Memory Efficiency**: No duplicate service instances
- **Simple Implementation**: Just extend a base class and import a module

## How It Works

### The Problem

In **Module Federation setups** where microfrontends are built as separate bundles and loaded dynamically, Angular's dependency injection can create separate instances of services even when using `providedIn: 'root'`. This happens because:

1. **Separate Bundle Contexts**: Each microfrontend bundle has its own module resolution
2. **Dynamic Loading**: Services are instantiated when each bundle is loaded
3. **Isolated Execution Contexts**: Each microfrontend may run in its own JavaScript execution context

**Note**: This is NOT a general Angular limitation. In normal Angular applications (single bundle, lazy-loaded modules), `providedIn: 'root'` works perfectly and creates true singletons.

### When Do You Need This Solution?

**✅ Use this shared service system when:**
- Using Module Federation with separate microfrontend bundles
- Microfrontends are loaded dynamically at runtime
- Each microfrontend is built as a separate application
- You need to share state across different JavaScript execution contexts

**❌ You DON'T need this when:**
- Building a single Angular application
- Using lazy-loaded modules within the same app
- All components share the same JavaScript execution context
- Using `providedIn: 'root'` works fine for your use case

### The Solution

Our shared service system uses:

1. **Global Registry**: A global registry that stores service instances across all microfrontends
2. **Injection Token Caching**: Cached injection tokens to ensure consistency
3. **Factory Providers**: Custom factory functions that return the shared instance
4. **Base Class Pattern**: A base class that handles the sharing logic automatically

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Shell App     │    │    MFE App      │    │   MFE2 App      │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ Component   │ │    │ │ Component   │ │    │ │ Component   │ │
│ │             │ │    │ │             │ │    │ │             │ │
│ │ @Inject(    │ │    │ │ @Inject(    │ │    │ │ @Inject(    │ │
│ │   Token     │ │    │ │   Token     │ │    │ │   Token     │ │
│ │ )           │ │    │ │ )           │ │    │ │ )           │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────────┐
                    │  Global Registry    │
                    │                     │
                    │ ┌─────────────────┐ │
                    │ │ Shared Service  │ │
                    │ │   Instance      │ │
                    │ └─────────────────┘ │
                    └─────────────────────┘
```

## Step-by-Step Guide

### Step 1: Create Your Shared Service

Create a service that extends `AutoSharedService`:

```typescript
// shared/src/lib/my-service/my-service.ts
import { Injectable } from '@angular/core';
import { AutoSharedService } from '../base/auto-shared-service';

@Injectable()
export class MyService extends AutoSharedService {
  private data: any = {};

  constructor() {
    super();
    // Your initialization logic here
  }

  setData(key: string, value: any) {
    this.data[key] = value;
  }

  getData(key: string) {
    return this.data[key];
  }

  getAllData() {
    return this.data;
  }
}
```

### Step 2: Register the Service

Add your service to the `SharedServicesModule`:

```typescript
// shared/src/lib/shared-services.module.ts
import { NgModule } from '@angular/core';
import { SharedServiceRegistry } from './registry/shared-service-registry';
import { UselessService } from './useless-service/useless-service';
import { MyService } from './my-service/my-service'; // Add your service

// Register services before module instantiation
SharedServiceRegistry.register(UselessService);
SharedServiceRegistry.register(MyService); // Register your service

@NgModule({
  providers: [
    ...SharedServiceRegistry.getAllProviders()
  ]
})
export class SharedServicesModule {
  // Add more services here as needed
}
```

### Step 3: Import the Module in Your Apps

Add `SharedServicesModule` to each microfrontend that needs the shared service:

```typescript
// apps/shell/src/app/app.module.ts
import { SharedServicesModule, SharedServiceRegistry, MyService } from '@shared/ng-ui';

// Register services before module instantiation
SharedServiceRegistry.register(MyService);

@NgModule({
  imports: [
    // ... other imports
    SharedServicesModule,
  ],
  providers: [
    // Add shared service providers directly
    {
      provide: SharedServiceRegistry.getSharedToken(MyService),
      useFactory: () => SharedServiceRegistry.getSharedInstance(MyService)
    }
  ],
  // ... rest of module config
})
export class AppModule { }
```

### Step 4: Inject the Service in Components

Use the shared service in your components:

```typescript
// apps/shell/src/app/my-component/my-component.ts
import { Component, Inject } from '@angular/core';
import { MyService, SharedServiceRegistry } from '@shared/ng-ui';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <h3>Data: {{ getData() | json }}</h3>
      <button (click)="updateData()">Update Data</button>
    </div>
  `
})
export class MyComponent {
  constructor(
    @Inject(SharedServiceRegistry.getSharedToken(MyService)) 
    public myService: MyService
  ) {}

  getData() {
    return this.myService.getAllData();
  }

  updateData() {
    this.myService.setData('timestamp', new Date().toISOString());
  }
}
```

## Examples

### Example 1: Counter Service

```typescript
@Injectable()
export class CounterService extends AutoSharedService {
  private count = 0;

  constructor() {
    super();
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  getCount() {
    return this.count;
  }

  reset() {
    this.count = 0;
  }
}
```

### Example 2: User Session Service

```typescript
@Injectable()
export class UserSessionService extends AutoSharedService {
  private user: any = null;
  private isAuthenticated = false;

  constructor() {
    super();
  }

  login(user: any) {
    this.user = user;
    this.isAuthenticated = true;
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
  }

  getCurrentUser() {
    return this.user;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }
}
```

### Example 3: Shopping Cart Service

```typescript
@Injectable()
export class ShoppingCartService extends AutoSharedService {
  private items: any[] = [];

  constructor() {
    super();
  }

  addItem(item: any) {
    this.items.push(item);
  }

  removeItem(itemId: string) {
    this.items = this.items.filter(item => item.id !== itemId);
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  clear() {
    this.items = [];
  }
}
```

## Best Practices

### 1. Service Design

- **Keep services stateless when possible**: Prefer methods over properties for data access
- **Use immutable data patterns**: Return new objects instead of mutating existing ones
- **Handle initialization properly**: Use the constructor for one-time setup only

### 2. Error Handling

```typescript
@Injectable()
export class RobustService extends AutoSharedService {
  private data: any = null;

  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    try {
      // Your initialization logic
      this.data = {};
    } catch (error) {
      console.error('Failed to initialize service:', error);
      this.data = null;
    }
  }

  getData() {
    if (this.data === null) {
      throw new Error('Service not properly initialized');
    }
    return this.data;
  }
}
```

### 3. Memory Management

- **Clean up resources**: Implement cleanup methods for services that hold resources
- **Avoid memory leaks**: Don't store references to DOM elements or large objects
- **Use weak references**: For temporary data that should be garbage collected

### 4. Testing

```typescript
// Test your shared service
describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SharedServiceRegistry.getSharedToken(MyService),
          useFactory: () => SharedServiceRegistry.getSharedInstance(MyService)
        }
      ]
    });
    service = TestBed.inject(SharedServiceRegistry.getSharedToken(MyService));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should share data across instances', () => {
    service.setData('test', 'value');
    expect(service.getData('test')).toBe('value');
  });
});
```

## Troubleshooting

### Common Issues

#### 1. NG0201: No provider found for InjectionToken

**Problem**: The injection token is not properly provided.

**Solution**: Ensure you have:
- Registered the service with `SharedServiceRegistry.register(MyService)`
- Added the provider to your module's providers array
- Imported `SharedServicesModule`

#### 2. ExpressionChangedAfterItHasBeenCheckedError

**Problem**: The service is returning different values on each call.

**Solution**: Ensure your service methods return consistent values:
```typescript
// ❌ Bad - generates new ID each time
getServiceInfo() {
  return {
    id: Math.random().toString(36),
    data: this.data
  };
}

// ✅ Good - stable ID
private instanceId = Math.random().toString(36);

getServiceInfo() {
  return {
    id: this.instanceId,
    data: this.data
  };
}
```

#### 3. Service Not Shared Across Microfrontends

**Problem**: Each microfrontend has its own service instance.

**Solution**: Check that:
- All microfrontends import `SharedServicesModule`
- All microfrontends have the service provider in their module
- The service extends `AutoSharedService`
- Module Federation is properly configured

#### 4. Service State Not Persisting

**Problem**: Service state is lost when navigating between microfrontends.

**Solution**: Ensure the service is properly registered and the global registry is working:
```typescript
// Add debugging to verify sharing
constructor() {
  super();
  console.log('Service instance created:', this.constructor.name);
}
```

### Debugging Tips

1. **Check Console Logs**: Look for service registration and instantiation logs
2. **Verify Token Consistency**: Ensure the same injection token is used everywhere
3. **Test in Isolation**: Create a simple test service to verify the sharing mechanism
4. **Check Module Federation**: Ensure remote modules are properly loaded

### Performance Considerations

- **Lazy Loading**: Services are instantiated when first requested
- **Memory Usage**: Shared services persist for the lifetime of the application
- **Network Overhead**: No additional network calls for shared services
- **Bundle Size**: Minimal impact on bundle size

## Conclusion

The shared service system provides a robust and simple way to share state and functionality across Angular microfrontends. By following the patterns and best practices outlined in this guide, you can create maintainable and scalable microfrontend architectures.

Remember:
- Always extend `AutoSharedService` for your shared services
- Register services in `SharedServicesModule`
- Import the module in all microfrontends that need the service
- Use the proper injection pattern in your components
- Test your services thoroughly
- Follow the best practices for error handling and memory management

For more examples and advanced patterns, refer to the codebase in the `shared/src/lib` directory.
