import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserService } from './core/service/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private userService: UserService, private httpClient: HttpClient) {
    this.userService.getCurrentUser().pipe(takeUntilDestroyed()).subscribe();
  }
}
