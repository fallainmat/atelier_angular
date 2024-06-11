import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/service/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser = inject(UserService).userCurrent;
}
