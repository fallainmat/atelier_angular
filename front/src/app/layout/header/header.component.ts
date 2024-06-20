import {Component, inject} from '@angular/core';
import {UserService} from '../../core/service/user/user.service';
import {Router, RouterLink, RouterModule} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router)
  currentUser = inject(UserService).userCurrent;

  onNavigate(event: any) {
    const url = event.target.value;
    this.router.navigate([url]);

  }
}
