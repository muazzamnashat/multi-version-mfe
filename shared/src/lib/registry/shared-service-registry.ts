import { Provider, Type } from '@angular/core';
import { AutoSharedService } from '../base/auto-shared-service';

/**
 * Registry that automatically manages shared services across microfrontends
 * This is the main entry point for sharing services
 */
export class SharedServiceRegistry {
  private static registeredServices = new Map<string, Type<any>>();
  
  /**
   * Register a service to be shared across all microfrontends
   * @param serviceClass The service class to register
   */
  static register<T extends AutoSharedService>(serviceClass: Type<T>): void {
    const serviceName = serviceClass.name;
    this.registeredServices.set(serviceName, serviceClass);
  }
  
  /**
   * Get all providers for registered shared services
   * Call this in your module's providers array
   */
  static getAllProviders(): Provider[] {
    const providers: Provider[] = [];
    
    for (const [serviceName, serviceClass] of this.registeredServices) {
      if (serviceClass.prototype instanceof AutoSharedService) {
        const serviceClassTyped = serviceClass as any;
        const provider = serviceClassTyped.getSharedProvider();
        providers.push(provider);
      }
    }
    
    return providers;
  }
  
  /**
   * Get a specific shared service instance
   * @param serviceClass The service class
   */
  static getSharedInstance<T extends AutoSharedService>(serviceClass: Type<T>): T {
    return (serviceClass as any).getSharedInstance();
  }
  
  /**
   * Get the injection token for a specific service
   * @param serviceClass The service class
   */
  static getSharedToken<T extends AutoSharedService>(serviceClass: Type<T>) {
    return (serviceClass as any).getSharedToken();
  }
}
