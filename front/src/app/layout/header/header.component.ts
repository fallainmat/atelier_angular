import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../core/service/user/user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router)

  currentUser = inject(UserService).userCurrent;

  menuDisplayed = signal(false);

  menuItems: Array<{ title: string, link: string }> = [
    { title: 'Race', link: '' },
    { title: 'Defer', link: 'examples/defer/simple' },
    { title: 'Signal', link: 'examples/signal/counter' },
    { title: 'Signal input', link: 'examples/signal/input' }
  ]

  toggleMenu() {
    this.menuDisplayed.update((a) => !a)
  }
}
