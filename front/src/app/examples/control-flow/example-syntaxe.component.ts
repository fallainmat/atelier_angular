import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  template: `
    @if (messages$ | async; as messages) {
      @for (message of messages; track message.id) {
        <p>{{ message.body }}</p>
      }
    } @else {
      <p>No messages</p>
    }
    @if (!(messages$ | async); as messages) {
      <a class="block" (click)="addMessages()">
        Add messages
      </a>
    }
  `,
  imports: [
    AsyncPipe
  ],
  standalone: true
})
export class ExampleSyntaxeComponent {
  messages$ = new BehaviorSubject<Array<{ body: string, id: number }> | null>(null);

  addMessages() {
    this.messages$.next([
      { id: 1, body: 'message 1' },
      { id: 2, body: 'message 2' },
      { id: 3, body: 'message 3' }
    ]);
  }
}
