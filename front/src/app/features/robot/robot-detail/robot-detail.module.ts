import {NgModule} from '@angular/core';
import {RobotDetailComponent} from "./robot-detail.component";
import {RobotDetailRoutingModule} from "./robot-detail-routing.module";
import {JsonPipe, NgOptimizedImage, NgStyle} from '@angular/common';
import { ContainerDirective } from '../../../shared/container.directive';

@NgModule({
  declarations: [RobotDetailComponent],
    imports: [RobotDetailRoutingModule, JsonPipe, ContainerDirective, NgOptimizedImage, NgStyle]
})
export class RobotDetailModule {
}
