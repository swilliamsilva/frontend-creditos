import { Component, inject } from '@angular/core';
import { MessageService } from './services/message.service';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterOutlet],
  template: `
    <div *ngIf="errorMessage()" class="error-message">
      {{ errorMessage() }}
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .error-message {
      background: #f8d7da;
      color: #721c24;
      padding: 1rem;
      border-radius: 4px;
      text-align: center;
      margin: 1rem;
    }
  `]
})
export class AppComponent {
  private messageService = inject(MessageService);
  errorMessage = this.messageService.currentMessage;
}