import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'robot-detail',
    loadChildren: () => import('./features/robot/robot-detail/robot-detail.module').then(m => m.RobotDetailModule),
  },
  {
    path: 'examples',
    loadChildren: () => import('./examples/examples.route').then(m => m.routes)
  }
];
