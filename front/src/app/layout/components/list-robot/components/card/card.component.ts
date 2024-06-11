import { Component, Input } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Robot } from '../../../../../core/service/robot/robot.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({ required: true }) robot: Robot | null = null;
}
