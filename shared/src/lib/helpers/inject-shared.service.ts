import { inject, InjectionToken } from '@angular/core';
import { AutoSharedService } from '../base/auto-shared-service';

/**
 * Helper function to inject shared services
 * Usage: const myService = injectShared(MyService);
 */
export function injectShared<T extends AutoSharedService>(serviceClass: Type<T>): T {
  const token = (serviceClass as any).getSharedToken();
  return inject(token);
}

// Type alias for cleaner imports
type Type<T> = new (...args: any[]) => T;
