import { NgModule } from '@angular/core';
import { AutoSharedService } from './base/auto-shared-service';
import { UselessService } from './useless-service/useless-service';

// Register services before module instantiation
AutoSharedService.register(UselessService);

/**
 * Module that automatically sets up all shared services
 * Just import this module in your app and all services will be shared!
 */
@NgModule({
  providers: [
    // Register services here
    ...AutoSharedService.getAllProviders()
  ]
})
export class SharedServicesModule {
}
