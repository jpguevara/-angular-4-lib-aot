import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: ':id/mi', loadChildren: './mi/mi.module#MIModule'},

];
