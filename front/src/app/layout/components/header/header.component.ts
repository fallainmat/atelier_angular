import {Component, inject} from '@angular/core';
import {UserModel, UserService} from "../../../core/service/user/user.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser = toSignal<UserModel>(inject(UserService).getCurrentUser());

  startRace() {
    console.log('startRace');
  }
}
