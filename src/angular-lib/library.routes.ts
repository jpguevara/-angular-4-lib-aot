import { GlobalLayoutComponent } from './global-layout/global-layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: GlobalLayoutComponent },
  { path: 'route-a', component: GlobalLayoutComponent, loadChildren: './components/mi/mi.module#MIModule' },
  { path: 'route-b', component: GlobalLayoutComponent, loadChildren: './components/mi/mi.module#MIModule' },
];
