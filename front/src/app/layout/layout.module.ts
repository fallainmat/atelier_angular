import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from "./layout.component";
import {RouterOutlet} from "@angular/router";
import {ListRobotComponent} from "./components/list-robot/list-robot.component";
import {HeaderComponent} from "./components/header/header.component";
import {ListBettingComponent} from "./components/list-betting/list-betting.component";
import {RaceViewComponent} from "../race/race-view/race-view.component";


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
