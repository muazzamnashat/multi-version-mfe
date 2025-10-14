import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Home } from './home/home';
import { startsWith, WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';

export const appRoutes: Route[] = [
	{ path: '', component: Home, pathMatch: 'full' },
	{
	  path: 'mfe',
	  loadChildren: () =>
		  loadRemoteModule({
			  type: 'module',
			  // remoteName: 'mfe',
			  remoteEntry: 'http://localhost:4300/remoteEntry.js',
			  exposedModule: './Module'
		  })
		  .then(m => m.MfeModule)
  },
  {
	  matcher: startsWith('mfe2'),
	  component: WebComponentWrapper,
	  data: {
		  type: 'module',
		  remoteEntry: 'http://localhost:4400/remoteEntry.js',
		  exposedModule: './web-components',
		  elementName: 'mfe2-web-component'
	  } as WebComponentWrapperOptions
  },

  ]
