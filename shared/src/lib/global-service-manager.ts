// import { UselessService } from './useless-service/useless-service';

// declare global {
//   interface Window {
//     __sharedServices?: {
//       uselessService?: UselessService;
//     };
//   }
// }

// export class GlobalServiceManager {
//   static getSharedUselessService(): UselessService {
//     if (!window.__sharedServices) {
//       window.__sharedServices = {};
//     }
    
//     if (!window.__sharedServices.uselessService) {
//       window.__sharedServices.uselessService = new UselessService();
//       console.log('Created global UselessService instance');
//     }
    
//     return window.__sharedServices.uselessService;
//   }
// }
