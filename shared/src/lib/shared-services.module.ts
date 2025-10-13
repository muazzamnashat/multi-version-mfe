import { NgModule } from '@angular/core';
import { SharedServiceRegistry } from './registry/shared-service-registry';
import { UselessService } from './useless-service/useless-service';

// Register services before module instantiation
SharedServiceRegistry.register(UselessService);

/**
 * Module that automatically sets up all shared services
 * Just import this module in your app and all services will be shared!
 */
@NgModule({
  providers: [
    // Register services here
    ...SharedServiceRegistry.getAllProviders()
  ]
})
export class SharedServicesModule {
  // Add more services here as needed:
  // SharedServiceRegistry.register(AnotherService);
  // SharedServiceRegistry.register(YetAnotherService);
}
