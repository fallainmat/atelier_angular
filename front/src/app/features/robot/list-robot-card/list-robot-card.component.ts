import { Component, Input } from '@angular/core';
import { NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Robot } from '../../../core/service/robot/robot.model';
import { ContainerDirective } from '../../../shared/container.directive';
import { RaceBotComponent } from '../../race/race-bot/race-bot.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    NgStyle,
    ContainerDirective,
    RaceBotComponent
  ],
  templateUrl: './list-robot-card.component.html',
  styleUrl: './list-robot-card.component.scss'
})
export class ListRobotCardComponent {
  @Input({ required: true }) robot!: Robot;
}
