import { Injectable, InjectionToken } from '@angular/core';

// Global registry to store shared service instances
const sharedServiceRegistry = new Map<string, any>();

/**
 * Decorator that makes a service shared across all microfrontends
 * Usage: @SharedService() export class MyService { ... }
 */
export function SharedService() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const serviceName = constructor.name;
    const tokenName = `${serviceName}_SHARED_TOKEN`;
    
    // Create injection token
    const token = new InjectionToken<T>(tokenName);
    
    // Store the token in the constructor for later use
    (constructor as any).__sharedToken = token;
    
    // Create the shared instance
    if (!sharedServiceRegistry.has(serviceName)) {
      const instance = new constructor();
      sharedServiceRegistry.set(serviceName, instance);
      console.log(`Created shared instance of ${serviceName}`);
    }
    
    // Return the decorated class
    return class extends constructor {
      static getSharedInstance(): T {
        return sharedServiceRegistry.get(serviceName);
      }
      
      static getSharedToken(): InjectionToken<T> {
        return token;
      }
      
      static getSharedProvider() {
        return {
          provide: token,
          useFactory: () => sharedServiceRegistry.get(serviceName)
        };
      }
    };
  };
}
