import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { interval, map, pairwise, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContainerDirective } from '../../../shared/container.directive';

@Component({
  selector: 'app-triggers.component.ts',
  standalone: true,
  imports: [
    AsyncPipe,
    ContainerDirective
  ],
  templateUrl: './triggers.component.html',
  styleUrl: './triggers.component.scss'
})
export class TriggersComponent {
  @ViewChild('vcr', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  @ViewChild('dynTemplate', { read: TemplateRef }) dynTemplate!: TemplateRef<unknown>;

  timerObs$ = interval(1000).pipe(
    takeUntilDestroyed(),
    startWith(0),
    pairwise(),
    map(([prev, curr]) => prev + 1)
  );

  addToView() {
    const template = this.dynTemplate;
    const vcr = this.vcr;
    if (vcr && template) {
      vcr.createEmbeddedView(template)
    }
  }

  clearView() {
    this.vcr.clear();
  }
}
