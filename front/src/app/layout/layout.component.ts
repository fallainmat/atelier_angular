import { Component } from '@angular/core';
import {ListRobotComponent} from "./components/list-robot/list-robot.component";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {ListBettingComponent} from "./components/list-betting/list-betting.component";
import { RaceViewComponent } from '../race/race-view/race-view.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    ListRobotComponent,
    RouterOutlet,
    HeaderComponent,
    ListBettingComponent,
    RaceViewComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
