import { Routes } from '@angular/router';
import { robotDetailResolver } from './robot-detail/robot-detail.resolver';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'robot-detail/:name',
    loadComponent: () => import('./robot-detail/robot-detail.component').then(m => m.RobotDetailComponent),
    resolve: { robot: robotDetailResolver }
  },
  {
    path: 'examples',
    loadChildren: () => import('./examples/examples.route').then(m => m.routes)
  }
];
