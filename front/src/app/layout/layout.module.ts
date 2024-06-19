import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from "./layout.component";
import {RouterOutlet} from "@angular/router";
import {ListRobotComponent} from "../features/robot/list-robot/list-robot.component";
import {HeaderComponent} from "./header/header.component";
import {ListBettingComponent} from "../features/bet/list-betting/list-betting.component";
import {RaceViewComponent} from "../features/race/race-view/race-view.component";


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    ListRobotComponent,
    RouterOutlet,
    HeaderComponent,
    ListBettingComponent,
    RaceViewComponent
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {
}
