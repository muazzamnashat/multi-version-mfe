import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
const comp = await import('mfe/App');

export const appRoutes: Route[] = [
	{
		path: 'mfe',
		loadComponent: () =>
    import('mfe/App').then(m => m.App) 
	}
];
