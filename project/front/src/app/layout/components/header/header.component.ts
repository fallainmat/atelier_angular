import {Component, DestroyRef, inject} from '@angular/core';
import {UserService} from "../../../core/service/user/user.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {BetService} from "../../../core/service/bet/bet.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser = inject(UserService).userCurrent;
  destroyRef = inject(DestroyRef);
  betService = inject(BetService);

  startRace() {
    this.betService.startRace().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
