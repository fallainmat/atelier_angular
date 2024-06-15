import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './core/service/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LayoutModule } from './layout/layout.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutModule],
  templateUrl: './app.component.html',

})
export class AppComponent {
  constructor(private userService: UserService) {
    this.userService.getCurrentUser().pipe(takeUntilDestroyed()).subscribe();
  }
}
