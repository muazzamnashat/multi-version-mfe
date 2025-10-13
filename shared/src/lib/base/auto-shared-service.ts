import { Injectable, InjectionToken, Provider, Type } from '@angular/core';

// Unified registry for auto-shared services
interface ServiceEntry {
  class: Type<any>;
  instance: any;
}

const serviceRegistry = new Map<string, ServiceEntry>();
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
    if (!serviceRegistry.has(serviceName)) {
      serviceRegistry.set(serviceName, {
        class: this.constructor as Type<any>,
        instance: this
      });
    }
  }
  
  /**
   * Get the shared instance of this service
   */
  static getSharedInstance<T extends AutoSharedService>(this: new (...args: any[]) => T): T {
    const serviceName = this.name;
    if (!serviceRegistry.has(serviceName)) {
      // Create instance if it doesn't exist
      const instance = new this();
      serviceRegistry.set(serviceName, {
        class: this,
        instance: instance
      });
    }
    return serviceRegistry.get(serviceName)!.instance;
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

  /**
   * Register a service class for sharing
   * This is called automatically when the service is instantiated
   */
  static register<T extends AutoSharedService>(serviceClass: Type<T>): void {
    const serviceName = serviceClass.name;
    if (!serviceRegistry.has(serviceName)) {
      // Create instance when registering
      const instance = new serviceClass();
      serviceRegistry.set(serviceName, {
        class: serviceClass,
        instance: instance
      });
    }
  }

  /**
   * Get all providers for registered shared services
   * Call this in your module's providers array
   */
  static getAllProviders(): Provider[] {
    const providers: Provider[] = [];
    
    for (const [serviceName, entry] of serviceRegistry) {
      if (entry.class.prototype instanceof AutoSharedService) {
        const serviceClass = entry.class as any;
        const provider = serviceClass.getSharedProvider();
        providers.push(provider);
      }
    }
    
    return providers;
  }

  /**
   * Get a specific shared service instance by class
   * @param serviceClass The service class
   */
  static getSharedInstanceByClass<T extends AutoSharedService>(serviceClass: Type<T>): T {
    return (serviceClass as any).getSharedInstance();
  }

  /**
   * Get the injection token for a specific service by class
   * @param serviceClass The service class
   */
  static getSharedTokenByClass<T extends AutoSharedService>(serviceClass: Type<T>) {
    return (serviceClass as any).getSharedToken();
  }
}
