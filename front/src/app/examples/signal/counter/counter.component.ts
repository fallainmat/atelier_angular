import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Injector, input,
  OnInit,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CounterChildComponent} from "./components/counter-child/counter-child.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NasaService} from "../../../core/service/test/nasa.service";

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    AsyncPipe,
    CounterChildComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  type = input<string>();

  router = inject(Router);
  destroyRef = inject(DestroyRef);
  newNasaService = inject(NasaService);
  injector = inject(Injector);

  count: WritableSignal<number> = signal(0);
  doubleCount: Signal<number> = computed(() => this.count() * 2);

  showCount = signal(false);
  conditionalCount = computed(() => {
    if (this.showCount()) {
      return `Le count est ${this.count()}.`;
    } else {
      return 'Je ne vois plus ce count';
    }
  });

  displayChild = false;

  countObs$ = new BehaviorSubject(0);
  doubleCountObs$: Observable<number> = this.countObs$.pipe(map(value => value * 2));
  countObs: number = 0;

  comptutedActivated = false;
  effectActivated = false;

  constructor() {
    this.countObs$.pipe(takeUntilDestroyed()).subscribe(value => {
      this.countObs = value
    });
    effect(() => {
    });
  }

  ngOnInit() {
  }

  incrementValue() {
    this.count.update((value) => value + 1);
    this.countObs$.next(this.countObs + 1);
  }

  decrementValue() {
    this.count.update((value) => value - 1);
    this.countObs$.next(this.countObs - 1);
  }

  resetValue() {
    this.count.set(0);
    this.countObs$.next(0)
  }

  changeConditionalDouble() {
    this.showCount.update((value) => !value);
  }

  changeDisplayChild() {
    this.displayChild = !this.displayChild;
  }

  sectionChange(type: string) {
    this.router.navigate([`/examples/signal/counter`],{ queryParams: { type } });
  }

  getNasaApi() {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    this.newNasaService.getListOfDailyImages(date).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
