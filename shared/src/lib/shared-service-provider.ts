// import { Injectable, Provider } from '@angular/core';
// import { UselessService, USELESS_SERVICE_INSTANCE } from './useless-service/useless-service';
// import { GlobalServiceManager } from './global-service-manager';

// // Global instance that will be shared across all microfrontends
// let globalUselessServiceInstance: UselessService | null = null;

// @Injectable()
// export class SharedServiceProvider {
//   static getSharedUselessService(): UselessService {
//     // Try to use the global window-based service first
//     try {
//       return GlobalServiceManager.getSharedUselessService();
//     } catch (error) {
//       // Fallback to module-level singleton
//       if (!globalUselessServiceInstance) {
//         globalUselessServiceInstance = new UselessService();
//         console.log('Created module-level UselessService instance');
//       }
//       return globalUselessServiceInstance;
//     }
//   }

//   static getSharedUselessServiceProvider(): Provider {
//     return {
//       provide: USELESS_SERVICE_INSTANCE,
//       useFactory: () => SharedServiceProvider.getSharedUselessService()
//     };
//   }
// }
