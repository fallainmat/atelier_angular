import { Component, Input } from '@angular/core';
import { NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Robot } from '../../../core/service/robot/robot.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    NgStyle
  ],
  templateUrl: './list-robot-card.component.html',
  styleUrl: './list-robot-card.component.scss'
})
export class ListRobotCardComponent {
  @Input({ required: true }) robot: Robot | null = null;
}
