import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'robot-detail',
    loadChildren: () => import('./robot-detail/robot-detail.module').then(m => m.RobotDetailModule),
  }
];
