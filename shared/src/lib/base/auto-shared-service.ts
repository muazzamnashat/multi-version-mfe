import { Injectable, InjectionToken } from '@angular/core';

// Global registry for auto-shared services
const autoSharedRegistry = new Map<string, any>();
const tokenCache = new Map<string, InjectionToken<any>>();

/**
 * Base class for services that should be automatically shared across microfrontends
 * Just extend this class and your service will be automatically shared!
 */
@Injectable()
export abstract class AutoSharedService {
  // private static readonly serviceName = Symbol('serviceName');
  
  constructor() {
    const serviceName = this.constructor.name;
    
    // Register this service as shared if not already registered
    if (!autoSharedRegistry.has(serviceName)) {
      autoSharedRegistry.set(serviceName, this);
    }
  }
  
  /**
   * Get the shared instance of this service
   */
  static getSharedInstance<T extends AutoSharedService>(this: new (...args: any[]) => T): T {
    const serviceName = this.name;
    if (!autoSharedRegistry.has(serviceName)) {
      // Create instance if it doesn't exist
      const instance = new this();
      autoSharedRegistry.set(serviceName, instance);
    }
    return autoSharedRegistry.get(serviceName);
  }
  
  /**
   * Get the injection token for this service
   */
  static getSharedToken<T extends AutoSharedService>(this: new (...args: any[]) => T): InjectionToken<T> {
    const serviceName = this.name;
    const tokenName = `${serviceName}_AUTO_SHARED_TOKEN`;
    
    // Return cached token if it exists, otherwise create and cache it
    if (!tokenCache.has(tokenName)) {
      const token = new InjectionToken<T>(tokenName);
      tokenCache.set(tokenName, token);
    }
    
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return tokenCache.get(tokenName)!;
  }
  
  /**
   * Get the provider configuration for this service
   */
  static getSharedProvider<T extends AutoSharedService>(this: new (...args: any[]) => T) {
    const serviceClass = this as any;
    return {
      provide: serviceClass.getSharedToken(),
      useFactory: () => serviceClass.getSharedInstance()
    };
  }
}
