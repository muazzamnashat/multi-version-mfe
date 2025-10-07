import { Routes } from '@angular/router';
import { Home } from './home/home';
import { endsWith } from '@angular-architects/module-federation-tools';

export const routes: Routes = [{
	matcher: endsWith('home'), component: Home, pathMatch: 'full'
}]