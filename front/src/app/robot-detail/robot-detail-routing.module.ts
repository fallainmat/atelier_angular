import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RobotDetailComponent} from "./robot-detail.component";
import {robotDetailResolver} from "./robot-detail.resolver";

const routes: Routes = [
  {
    path: ':name',
    component: RobotDetailComponent,
    resolve: {
      robot: robotDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RobotDetailRoutingModule {
}
