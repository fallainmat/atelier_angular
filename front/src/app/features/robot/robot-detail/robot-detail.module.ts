import {NgModule} from '@angular/core';
import {RobotDetailComponent} from "./robot-detail.component";
import {RobotDetailRoutingModule} from "./robot-detail-routing.module";
import {JsonPipe} from "@angular/common";

@NgModule({
  declarations: [RobotDetailComponent],
  imports: [RobotDetailRoutingModule, JsonPipe],
})
export class RobotDetailModule {
}
