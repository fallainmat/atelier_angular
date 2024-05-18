import { Component } from '@angular/core';
import {ListRobotComponent} from "./list-robot/list-robot.component";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {ListBettingComponent} from "./list-betting/list-betting.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    ListRobotComponent,
    RouterOutlet,
    HeaderComponent,
    ListBettingComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
